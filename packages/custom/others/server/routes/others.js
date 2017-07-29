(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Others, app, auth, database) {

        // var requiresAdmin = circles.controller.hasCircle('admin');
        // var requiresLogin = circles.controller.hasCircle('authenticated');
        var books = require('../controllers/book');
        
        app.post('/api/addBook', books.addNewBook);
        
        app.post('/api/editBook', books.updateBook);
        app.post('/api/removeBook', books.removeBook);
        app.get('/api/getAllBooks', books.getAllBooks);

        app.get('/api/getCustomerBooks', books.getCustomerBooks);
        app.post('/api/addBookToCustomer', books.addBookToCustomer);
        app.post('/api/removeCustomerBook', books.removeCustomerBook);

        app.post('/api/assignedCustomers', books.assignedCustomers);

        app.post('/api/unAssignedCustomers', books.unAssignedCustomers);

        app.post('/api/assignBookToCustomer', books.assignBookToCustomer);
        
       
    };
})();
