/*********************************************************************************** *
 * MIT License
 *
 * Copyright (c) 2017 Raphael "rGunti" Guntersweiler
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * ********************************************************************************* */

const debug = require('debug')('node-system-control:Routes/API');
const sshDebug = require('debug')('node-system-control:SSH');
const config = require('../base/config');
const ResponseUtils = require('../base/response_utils');

var SSH = require('simple-ssh');

var express = require('express');
var router = express.Router();

function getSSH() {
    var ssh = new SSH(getSSHConfig());
    ssh.on('error', function(err) {
        sshDebug('Oops, something went wrong.');
        sshDebug(err);
        ssh.end();
    });
    return ssh;
}

function getSSHConfig() {
    return {
        host: config.getValue(config.KEYS.SERVER_HOST),
        user: config.getValue(config.KEYS.SERVER_USER),
        pass: config.getValue(config.KEYS.SERVER_PASS)
    };
}

/* GET "/" */
router.get('/', function(req, res, next) {
    res.json({ ok: true });
});

/* POST "Shutdown" */
router.post('/shutdown', function(req, res, next) {
    var ssh = getSSH();
    ssh.exec('sudo halt', { pty: true, out: function(o) { sshDebug(o) } }).start();
    ResponseUtils.sendEmptyResponse(res);
});

/* POST "Reboot" */
router.post('/reboot', function(req, res, next) {
    var ssh = getSSH();
    ssh.exec('sudo reboot', { pty: true, out: function(o) { sshDebug(o) } }).start();
    ResponseUtils.sendEmptyResponse(res);
});

// -- -- --
// Check if SSH can be reached
var testSSH = getSSH();
testSSH.exec('echo Test Connection succeeded', { out: function(o) { sshDebug(o) } }).start();

module.exports = router;
