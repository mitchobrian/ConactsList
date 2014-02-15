document.addEventListener("deviceready", onDeviceReady, false);    

function onDeviceReady() {
    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true; 
    var fields = ["displayName", "phoneNumbers"];
    navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts) {
    globalContacts = contacts;
    allCFromDevice = contacts.length;
    $.mobile.loading('show', {theme: "a", textVisible: true, text: "loaded " + allCFromDevice + " contacts", textonly: false});
    setTimeout(contactsSort, 500);
}

function onError(contactError) {
    alert('onError!');
}

var allContacts = 0;
var allContactsAdded = 0;
var allCFromDevice = 1;
var globalContacts;
var lastContacts = '';
var html = '';
var maxContacts = 100;

function contactsAddToDom() {
    setTimeout(contactsNextContact, 5);
}

function contactsNextContact() {
    var contact = null;
    if(allContacts < allCFromDevice && allContactsAdded+1 < maxContacts) {
        contact = globalContacts[allContacts++]; 
        if(contact.displayName != null && 
            contact.phoneNumbers != null && 
            contact.displayName != undefined &&
            contact.phoneNumbers != undefined) {
      
            // new conact - add the last one
            if(lastContacts.trim().toLowerCase() != contact.displayName.trim().toLowerCase() && html != '') {
                html += '</ul></li>';
                $('#contactsList').append(html);
                html = '';
                allContactsAdded++;
            }

            var numbers = 0;
            if(contact.phoneNumbers != null) numbers = contact.phoneNumbers.length;

            if(numbers > 0) {
                // new contact with numbers
                if(lastContacts.trim().toLowerCase() != contact.displayName.trim().toLowerCase()) {
                    html = '<li data-role="collapsible" data-inset="false" style="margin:0px;padding:0px;margin-top:-10px;"><h3>' + contact.displayName + '<span class="ui-li-count">' + numbers + '</span></h3>';
                    html += '<ul data-role="listview">'
                }
                // save all numbers
                for(var j=0; j < numbers; j++) {
                  if(contact.phoneNumbers[j].type != null && contact.phoneNumbers[j].value != null)
                    html += '<li style="font-family:Arial;">' + contact.phoneNumbers[j].type + 
                      ": " + contact.phoneNumbers[j].value + '</li>';
                }
                // save last contacts name
                lastContacts = contact.displayName;
            }
        }
        $.mobile.loading('show', {theme: "a", textVisible: true, text: "loaded " + allContacts + " of " + allCFromDevice + " contacts, added: " + allContactsAdded, textonly: false});
        setTimeout(contactsNextContact, 1);    
    } else {
        // last conact of list
        if(html != '') {
            html += '</ul></li>';
            $('#contactsList').append(html);
            allContactsAdded++;
        }
        $('#contactsheadline').append(' ( ' + allContactsAdded + ' ) '); 
        // refresh my dom
        $('#contactsList').listview( "refresh" );    
        $.mobile.loading('hide');  
        $('[data-role=collapsible]').collapsible().trigger('create');
    }
}

function contactsSort() {
    function SortByName(a, b){
      var aName = ((a.displayName != null) ? a.displayName.toLowerCase() : '');
      var bName = ((b.displayName != null) ? b.displayName.toLowerCase() : ''); 
      return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
    }
    globalContacts.sort(SortByName);    
    $.mobile.loading('show', {theme: "a", textVisible: true, text: "sorted all contacts", textonly: false});
    setTimeout(contactsAddToDom, 50);
}

function contactsLoading() {
    $.mobile.loading('show', {theme: "a", textVisible: true, text: "loading...", textonly: false});
}