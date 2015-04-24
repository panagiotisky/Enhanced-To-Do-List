$(document).ready(function() {
  
  function loadList() {
    if ( localStorage.getItem('toDoList') ) {
      theList.innerHTML = localStorage.getItem('toDoList');
      var listItemsNum = $('#the-list li').length + 1;
      if ( listItemsNum > 2 ) {
        $('#clearAll').css('display', 'inline-block');
      }
    }
  }// Check if there is a saved list and load it
  
  loadList();
  
  var newListItem, listEmpty = true, theList = $('#the-list');
  $(theList).sortable();
  $(theList).disableSelection();
  
  document.getElementById('clearAll').addEventListener('click', function(e) {
    theList.children().remove();
    e.preventDefault();
    localStorage.clear();
    $('#clearAll').css('display', 'none');
  });
  
  $('#addListItem').on('click', function(e) {
    e.preventDefault();
    var listItemValue = $('#newListItem').val();
    if (listEmpty == true) {
      newListItem = '<li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span><span class="itemValue">' + listItemValue + '</span><span href="#" class="ui-icon ui-icon-close"></span></li>';
      listEmpty = false;
    } else {
      newListItem = $('#the-list li:last').clone();
      newListItem.find('span.itemValue').text(listItemValue);
    }
    
    var listItemsNum = $('#the-list li').length + 1;
    if ( listItemsNum > 1 ) {
      $('#clearAll').css('display', 'inline-block');
    }
    
    theList.append(newListItem);
    $('#newListItem').val('');
    $('#newListItem').focus();
    localStorage.setItem('toDoList', theList.html());
  });
  
  $('input#newListItem').on('keypress', function(e) {
    if ( e.which === 13 ) {
      e.preventDefault();
      $('input#addListItem').trigger('click');
    }
  });
  
  theList.on('mouseover', 'li', function() {
    $(this).find('span.ui-icon-close').css('display', 'inline-block');
  });
  
  theList.on('mouseout', 'li', function() {
    $(this).find('span.ui-icon-close').css('display', 'none');
  });
  
  theList.on('click', 'span.ui-icon-close', function() {
    $(this).parent().remove();
    var listItemsNum = $('#the-list li').length + 1;
    if ( listItemsNum < 2 ) {
      listEmpty = true;
      $('#clearAll').css('display', 'none');
    }
    localStorage.setItem('toDoList', theList.html());
  });
  
});