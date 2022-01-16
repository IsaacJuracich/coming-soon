var socket = io();
$('#proxyToggle').click(function () {
  if ($(this).hasClass('btn-success')) {
    $(this).removeClass('btn-success');
    $(this).addClass('btn-danger')
    $(this).text('Bot Disabled')
    socket.emit('setProxyStatus', {
      value: false
    })
  } else {
    $(this).removeClass('btn-danger');
    $(this).addClass('btn-success')
    $(this).text('Bot Enabled')
    socket.emit('setProxyStatus', {
      value: true
    })
  }
})
socket.on('loadSettings', function (data) {
  $('#username').val(data.username)
  $('#password').val(data.password)
  $('#serverip').val(data.ip)
  if (!data.enabled) {
    $('#proxyToggle').removeClass('btn-success');
    $('#proxyToggle').addClass('btn-danger')
    $('#proxyToggle').text('PROXY DISABLED')
  }
})
$('#saveSettings').click(function () {
  var data = {
    username: $('#username').val(),
    password: $('#password').val(),
    ip: $('#serverip').val()
  }
  socket.emit('changeSettings', data)
})
