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
const os = require('os');

var express = require('express');
var router = express.Router();

function respond(res, view, page, title, additionalIncludes, data) {
    res.render('templates/' + view, {
        title: title,
        page: page,
        config: config.items,
        additionalIncludes: additionalIncludes || [],
        data: data
    });
}

/* GET "Now Playing" */
router.get('/', function(req, res, next) {
    respond(res, 'main', 'home', 'Home', [
        'modals/action_confirm',
        'modals/processing'
    ]);
});

/* GET "About" */
router.get('/about', function(req, res, next) {
    respond(res, 'main', 'about', 'About', null, {
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

        processEnv: process.env,

        nodeInfo: {
            version: process.version,
            versions: process.versions,
            memoryUsage: process.memoryUsage()
        },

        packageInfo: config.packageInfo,
        config: config.items
    });
});

/* GET "License" */
router.get('/license', function(req, res, next) {
    respond(res, 'main', 'license', 'License Info', null, {
        config: config.items,
        packageInfo: config.packageInfo
    });
});

module.exports = router;
