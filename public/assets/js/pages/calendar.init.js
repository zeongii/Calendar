// Function to handle event click
function eventClicked() {
    document.getElementById("form-event").classList.add("view-event");
    document.getElementById("event-title").classList.replace("d-block", "d-none");
    document.getElementById("event-category").classList.replace("d-block", "d-none");
    document.getElementById("btn-save-event").setAttribute("hidden", true);
}

// Function to handle editing events
function editEvent(element) {
    var dataId = element.getAttribute("data-id");

    if (dataId === "new-event") {
        document.getElementById("modal-title").innerHTML = "Add Event";
        document.getElementById("btn-save-event").innerHTML = "Add Event";
        eventTyped();
    } else if (dataId === "edit-event") {
        element.innerHTML = "Cancel";
        document.getElementById("btn-save-event").innerHTML = "Update Event";
        element.removeAttribute("hidden");
        eventTyped();
    } else {
        element.innerHTML = "Edit";
        eventClicked();
    }
}

// Function to handle event typing
function eventTyped() {
    document.getElementById("form-event").classList.remove("view-event");
    document.getElementById("event-title").classList.replace("d-none", "d-block");
    document.getElementById("event-category").classList.replace("d-none", "d-block");
    document.getElementById("btn-save-event").removeAttribute("hidden");
}

// Document ready event
document.addEventListener("DOMContentLoaded", function() {
    // Initialize modal and calendar variables
    var modal = new bootstrap.Modal(document.getElementById("event-modal"), { keyboard: false });
    var modalTitle = document.getElementById("modal-title");
    var formEvent = document.getElementById("form-event");
    var selectedEvent = null;

    // Set up current date
    var today = new Date();
    var currentDate = {
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear()
    };

    // Sample events
    var events = [
        { title: "All Day Event", start: new Date(currentDate.year, currentDate.month, 1) },
        { title: "Long Event", start: new Date(currentDate.year, currentDate.month, currentDate.day - 5), end: new Date(currentDate.year, currentDate.month, currentDate.day - 2), className: "bg-warning" },
        { id: 999, title: "Repeating Event", start: new Date(currentDate.year, currentDate.month, currentDate.day - 3, 16, 0), allDay: false, className: "bg-info" },
        // Additional events...
    ];

    // Initialize draggable external events
    var draggable = new FullCalendar.Draggable(document.getElementById("external-events"), {
        itemSelector: ".external-event",
        eventData: function(eventEl) {
            return {
                id: Math.floor(11000 * Math.random()),
                title: eventEl.innerText,
                allDay: true,
                className: eventEl.getAttribute("data-class")
            };
        }
    });

    // Initialize the FullCalendar
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: "local",
        editable: true,
        droppable: true,
        selectable: true,
        navLinks: true,
        initialView: (window.innerWidth < 768) ? 'listMonth' : (window.innerWidth < 1200 ? 'timeGridWeek' : 'dayGridMonth'),
        themeSystem: "bootstrap",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
        },
        // Event handlers
        eventClick: function(info) {
            handleEventClick(info.event);
        },
        dateClick: function(info) {
            handleDateClick(info);
        },
        events: events
    });

    // Event click handling
    function handleEventClick(event) {
        document.getElementById("edit-event-btn").removeAttribute("hidden");
        document.getElementById("btn-save-event").setAttribute("hidden", true);
        document.getElementById("edit-event-btn").setAttribute("data-id", "edit-event");
        document.getElementById("edit-event-btn").innerHTML = "Edit";

        eventClicked();
        modal.show();
        selectedEvent = event;

        // Populate modal fields
        modalTitle.innerHTML = "";
        modalTitle.innerHTML = "Edit Event";
        document.getElementById("event-title").value = event.title;
        document.getElementById("event-category").value = event.classNames[0];
    }

    // Date click handling
    function handleDateClick(info) {
        document.getElementById("edit-event-btn").setAttribute("hidden", true);
        document.getElementById("btn-save-event").removeAttribute("hidden");
        showCreateEventModal(info);
    }

    // Show modal for creating a new event
    function showCreateEventModal(info) {
        formEvent.reset();
        modal.show();
        modalTitle.innerText = "Create Event";
        selectedEvent = null;
    }

    // Handle form submission
    formEvent.addEventListener("submit", function(e) {
        e.preventDefault();

        var eventTitle = document.getElementById("event-title").value;
        var eventCategory = document.getElementById("event-category").value;

        if (selectedEvent) {
            // Update existing event
            selectedEvent.setProp("title", eventTitle);
            selectedEvent.setProp("classNames", [eventCategory]);
        } else {
            // Create new event
            var newEvent = {
                id: Math.floor(10000 * Math.random()),
                title: eventTitle,
                start: new Date(),
                allDay: true,
                className: eventCategory
            };
            calendar.addEvent(newEvent);
            events.push(newEvent);
        }
        modal.hide();
    });

    // Delete event handler
    document.getElementById("btn-delete-event").addEventListener("click", function() {
        if (selectedEvent) {
            selectedEvent.remove();
            selectedEvent = null;
            modal.hide();
        }
    });

    // New event button
    document.getElementById("btn-new-event").addEventListener("click", function() {
        showCreateEventModal();
    });

    // Render the calendar
    calendar.render();
});
