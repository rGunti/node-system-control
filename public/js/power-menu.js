/*
 * Copyright 2017 Raphael Guntersweiler
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

function reconnectLoop() {
    simpleAjax('/api', 'get', null, function() {
        // Reload the page
        location.reload(true);
    }, function() {
        setTimeout(function() { reconnectLoop() }, 5000)
    });
}

$(document).ready(function() {
    $('#shutdown-confirm').click(function() {
        var processModal = $('#shutdown-process-modal');
        var completeModal = $('#shutdown-complete-modal');

        simpleAjax('/api/shutdown', 'post', null, function() {
            setTimeout(function() {
                processModal.modal('close');
                completeModal.modal('open');
            }, 10000);
        });
    });
    $('#reboot-confirm').click(function() {
        var modal = $('#rebooting-process-modal');

        simpleAjax('/api/reboot', 'post', null, function() {
            setTimeout(function() {
                $('.flow-text', modal).text('Trying to reconnect now ...');
                reconnectLoop();
            }, 10000);
        });
    });
});
