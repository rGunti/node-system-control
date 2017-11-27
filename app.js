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

require('./base/ascii_printer');
const debug = require('debug')('node-system-control:MAIN');
const config = require('./base/config');

var express = require('express');
var hbs = require('express-hbs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var HandleRender = require('./ui/handlebar-renderer');
var HandleHelpers = require('./ui/handlebar-helpers');

var route_index = require('./routes/routes_index');
var route_api = require('./routes/routes_api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
let hbsEngine = hbs.express4({
    defaultLayout: __dirname + '/views/layouts/main.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
});
let hbhelpers = require('handlebars-helpers')({ handlebars: hbs.handlebars });
HandleHelpers.registerHelperMethods(hbs.handlebars);
app.engine('hbs', hbsEngine);
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Static Routes
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'node_modules/materialize-css/dist')));
app.use('/public', express.static(path.join(__dirname, 'node_modules/font-awesome')));
app.use('/public/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/public/css', express.static(path.join(__dirname, 'node_modules/material-design-icons-iconfont/dist')));
app.use('/public/js', express.static(path.join(__dirname, 'node_modules/moment/min')));
app.use('/public/css/roboto-condensed', express.static(path.join(__dirname, 'node_modules/typeface-roboto-condensed')));

app.use('/', route_index);
app.use('/api', route_api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.locals.config = config.items;
    res.locals.title = '!!! PANIC !!!';

    // render the error page
    res.status(err.status || 500);
    HandleRender.render(res, 'error', 'Error');
});

module.exports = app;
