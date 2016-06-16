// Saves options to chrome.storage
function save_options() {
  var tooltip = document.getElementById('tooltip').checked;
  var hover = document.getElementById('hover').checked;
  chrome.storage.sync.set({
    showTooltip: tooltip,
    showHover: hover
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    showTooltip: false,
    showHover: true
  }, function(items) {
    document.getElementById('tooltip').checked = items.showTooltip;
    document.getElementById('hover').checked = items.showHover;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);