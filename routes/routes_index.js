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

const debug = require('debug')('node-system-control:Routes/Index');
const config = require('../base/config');
const HandleRender = require('../ui/handlebar-renderer');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');

var express = require('express');
var router = express.Router();

function respond(res, view, page, title, additionalIncludes, data) {
    throw "NOT IMPLEMENTED!";
}

router.get('/', function(req, res, next) {
    HandleRender.render(res, 'index', 'System Control');
});

/* GET "About" */
router.get('/about', function(req, res, next) {
    HandleRender.render(res, 'about', 'About', {
        arch: os.arch(),
        cpus: os.cpus(),
        memoryFree: os.freemem(),
        memoryTotal: os.totalmem(),
        homeDir: os.homedir(),
        hostname: os.hostname(),
        network: os.networkInterfaces(),
        osPlatform: os.platform(),
        osType: os.type(),
        osRelease: os.release(),
        userInfo: os.userInfo(),
        uptime: moment.duration(process.uptime(), "seconds").format("d[d] HH:mm:ss", { largest: 2 }),

        processEnv: process.env,

        nodeInfo: {
            version: process.version,
            versions: process.versions,
            memoryUsage: process.memoryUsage()
        }
    });
});

/* GET "License" */
router.get('/license', function(req, res, next) {
    HandleRender.render(res, 'license', 'License');
});

module.exports = router;
