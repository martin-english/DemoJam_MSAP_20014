sap.ui.controller("demojam3.demojam3", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf demojam3.demojam3
*/
	  onInit: function() {
          this.Read();
	  },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf demojam3.demojam3
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf demojam3.demojam3
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf demojam3.demojam3
*/
//	onExit: function() {
//
//	}
	Read : function() {
		// Retrieve the Global Model
		var oModel = sap.ui.getCore().getModel();
		  
		// Send the GET request
		oModel.loadDataNew("http://nw702.basissap.com/sap/bc/zdemojam", handleSuccess, handleError );
		  
		function handleSuccess(oData){
			if(oData.success==='false'){
				// Display message
				sap.ui.commons.MessageBox.alert(oData.msg);
			}
		}
		 
		function handleError(){
				  // Display message
				  sap.ui.commons.MessageBox.alert(arguments[0].statusText);
		   }
	},
	//
	//
	//
	Create: function() {
		// Create a dialog to get the information of the contact to be created
		var oDialog = new sap.ui.commons.Dialog("Dialog", {
                  modal: true,
                  closed: function(oControlEvent){
                            sap.ui.getCore().getElementById('Dialog').destroy();
                  }
        });

		oDialog.setTitle("New Contact");
		 
		// Create a layout to place the controls in the dialog
		var oLayout = new sap.ui.commons.layout.MatrixLayout({
		          columns: 2,
		          width: "100%"
		});
		 
		// Create text field for the e-mail
		var oTF = new sap.ui.commons.TextField("tfEmail", {
		          tooltip: 'E-mail',
		          editable: true,
		          width: '200px'
		});
		 
		// Label for the e-mail field
		var oLabel = new sap.ui.commons.Label("lbEmail", {
		          text: 'E-mail',
		          labelFor: oTF
		});
		 
		// Create the first row
		oLayout.createRow(oLabel, oTF);
		          
		// Repeat for the subsequent fields
		// Create text field for the FirstName
		oTF = new sap.ui.commons.TextField("tfFirstName", {
		          tooltip: 'First Name',
		          editable: true,
		          width: '200px'
		});
		oLabel = new sap.ui.commons.Label("lbFirstName", {
		          text: 'First Name',
		          labelFor: oTF
		});
		oLayout.createRow(oLabel, oTF);
		 
		// Create text field for the last name
		oTF = new sap.ui.commons.TextField("tfLastName", {
		          tooltip: 'Last Name',
		          editable: true,
		          width: '200px'
		});
		oLabel = new sap.ui.commons.Label("lbLastName", {
		          text: 'Last Name',
		          labelFor: oTF
		});
		oLayout.createRow(oLabel, oTF);
		 
		// Create text field for the Phone
		oTF = new sap.ui.commons.TextField("tfPhone", {
		          tooltip: 'Phone / Text',
		          editable: true,
		          width: '200px'
		});
		oLabel = new sap.ui.commons.Label("lbPhone", {
		          text: 'Phone',
		          labelFor: oTF
		});
		oLayout.createRow(oLabel, oTF);

		// Add the layout to the dialog
		oDialog.addContent(oLayout);
		 
		// Add a button to post the contact's data to the REST interface
		oDialog.addButton(new sap.ui.commons.Button({text: "OK", press:function(){ 
		 
			var oModel2 = new myJSONModel;
		 
		    // Retrieve the contact information from the text fields
			var oParameters = {
		           "email" : sap.ui.getCore().getElementById('tfEmail').getValue(),
		           "firstname" : sap.ui.getCore().getElementById('tfFirstName').getValue(),
		           "lastname" : sap.ui.getCore().getElementById('tfLastName').getValue(),
		           "phone" : sap.ui.getCore().getElementById('tfPhone').getValue()
		     };
		 
		     // Post data to the REST interface
		     oModel2.loadDataNew("/SAP/bc/zdemojam/contact/",
		    		 handleSuccess, 
		    		 handleError,     
		    		 oParameters, 
		    		 true, 
		    		 'POST'
		     );
		 
		     function handleSuccess(oData){
		    	 if(oData.success==='true'){
		    		 // Retrieve the data from the global model
		    		 var oData2 = sap.ui.getCore().getModel().getData();
		    		 // If the global model has already any data then the models are merged
		    		 // If not, then the global model is populated with the new contact
		    		 if(jQuery.isArray(oData2.data)){
		    			 oData2.data = jQuery.merge(oData2.data, oData.data);
		    		 }else{
		    			 oData2.data = jQuery.merge([], oData.data);
		    		 }
		                      
		    		 // Refresh the Global Model Data
		    		 sap.ui.getCore().getModel().setData(oData2, false);
		            
		    	 }
		            
		    	 // Close the Dialog
		    	 sap.ui.getCore().getElementById('Dialog').close();
		            
		    	 // Display message
		    	 sap.ui.commons.MessageBox.alert(oData.msg);
		  
		     }
		 
		     function handleError(){
		          // Display message
		          sap.ui.commons.MessageBox.alert(arguments[0].statusText);
		     }
		 
		  }}));
		 
		  oDialog.open();
		 
		},
	//
	//    
	//
	Update : function() {

		var oModel = new myJSONModel;
		 
		// Get a reference of the table control
		var oTable = sap.ui.getCore().getElementById('tblctrl');
		 
		// Retrieve the selected index, i.e., the index of the selected row
		var i = oTable.getSelectedIndex();
		 
		// Base URL of the REST service
		var ServiceURL = "/SAP/bc/zdemojam/contact/";
		 
		if(i>=0){
		 
			// Retrieve the selected row
			var selectedRow = oTable.getRows()[i];
		 
			// Concatenate the Base URL and the contact's e-mail
			// Example: "<service-URL> <mandt> / <KeyField>"
			ServiceURL = ServiceURL + "/" + selectedRow.getCells()[0].getText();

			// The parameters that will be sent to the server as form fields
			var oParameters = {
					"email" : selectedRow.getCells()[0].getText(),
					"lastname" : selectedRow.getCells()[1].getValue(),
					"firstname" : selectedRow.getCells()[2].getValue(),
					"phone" : selectedRow.getCells()[3].getValue()
			};
		 
			// Send PUT request
			oModel.loadDataNew(ServiceURL, handleSuccess, handleError, oParameters, true, 'PUT');

		}else{
			// User have not selected any row
			sap.ui.commons.MessageBox.alert('No record selected');
		}
		 
		function handleSuccess(oData){
			// Display message
			sap.ui.commons.MessageBox.alert(oData.msg);
		}
		 
		function handleError(){
			// Display message
			sap.ui.commons.MessageBox.alert(arguments[0].statusText);
		}
	},
	//
	//    
	//
	Delete : function() {
		var oModel = new myJSONModel;
		 
		// Get a reference of the table control
		var oTable = sap.ui.getCore().getElementById('tblctrl');
	 
		// Retrieve the selected row
		var selIndex = oTable.getSelectedIndex();
	 
		// Base URL of the REST service
		var ServiceURL = "/SAP/bc/zdemojam/contact/";
	 
		if(selIndex >= 0){
			// Retrieve the selected row
			var selectedRow = oTable.getRows()[selIndex];
	 
			// Concatenate the Base URL and the contact's e-mail
			// Example: "<service-URL>/<KeyField>"
			ServiceURL = ServiceURL + selectedRow.getCells()[0].getText();
	 
			// The parameters that will be sent to the server as form fields
			var oParameters = {"email" : selectedRow.getCells()[0].getText()};

			// Send DELETE request
			oModel.loadDataNew(ServiceURL, handleSuccess, handleError, oParameters, true, 'DELETE');
		}else{
			// User have not selected any row
			sap.ui.commons.MessageBox.alert('No record selected');
		}
	 
		function handleSuccess(oData){
			if(oData.success==='true'){
	 
				// Retrieve the selected row
				var selectedRow = oTable.getRows()[selIndex];
	 
				// Retrieve the Global Model
				var oData2 = sap.ui.getCore().getModel().getData();
	 
				if(jQuery.isArray(oData2.data)){
					// Remove the deleted contact from the Global Model data
					oData2.data = jQuery.grep(oData2.data, function(n,i){
						return n.email !== selectedRow.getCells()[0].getText();
					});
	 
					// Update the Global Model data
					sap.ui.getCore().getModel().setData(oData2, false);
				}

			}
	 
			// Display message  
			sap.ui.commons.MessageBox.alert(oData.msg);
		}
	 
		function handleError(){
			// Display message
			sap.ui.commons.MessageBox.alert(arguments[0].statusText);
		}
	},
	//
	//    
	//
	Find : function() {
		// Create a dialog to get the information of the contact(s) to find
        var oDialog = new sap.ui.commons.Dialog("Dialog", {
                  modal: true,
                  closed: function(oControlEvent){
                            sap.ui.getCore().getElementById('Dialog').destroy();
                  }
        });

        oDialog.setTitle("Find Contact");

        // Create a layout to place the controls in the dialog
        var oLayout = new sap.ui.commons.layout.MatrixLayout({
                  columns: 2,
                  width: "100%"
        });

        // Create text field for the e-mail
        var oTF = new sap.ui.commons.TextField("tfEmail", {
                  tooltip: 'E-mail',
                  editable: true,
                  width: '200px'
        });

        // Label for the e-mail field
        var oLabel = new sap.ui.commons.Label("lbEmail", {
                  text: 'E-mail',
                  labelFor: oTF
        });

        // Create the first row
        oLayout.createRow(oLabel, oTF);

        // Repeat for the subsequent fields
        // Create text field for the FirstName
        oTF = new sap.ui.commons.TextField("tfFirstName", {
                  tooltip: 'First Name',
                  editable: true,
                  width: '200px'
        });
        oLabel = new sap.ui.commons.Label("lbFirstName", {
                  text: 'First Name',
                  labelFor: oTF
        });
        oLayout.createRow(oLabel, oTF);

        // Create text field for the last name
        oTF = new sap.ui.commons.TextField("tfLastName", {
                  tooltip: 'Last Name',
                  editable: true,
                  width: '200px'
        });
        oLabel = new sap.ui.commons.Label("lbLastName", {
                  text: 'Last Name',
                  labelFor: oTF
        });
        oLayout.createRow(oLabel, oTF);

        // Create text field for the Phone
        oTF = new sap.ui.commons.TextField("tfPhone", {
                  tooltip: 'Phone / Text',
                  editable: true,
                  width: '200px'
        });
        oLabel = new sap.ui.commons.Label("lbPhone", {
                  text: 'Phone',
                  labelFor: oTF
        });
        oLayout.createRow(oLabel, oTF);

        // Add the layout to the dialog
        oDialog.addContent(oLayout);
     
        // Add a button to post the contact's data to the REST interface
        oDialog.addButton(new sap.ui.commons.Button({text: "OK", press:function(){

        	// Get a reference of the Global Model
        	var oModel = sap.ui.getCore().getModel();

        	// The parameters that will be sent to the server
        	// as query string in the URL
        	var oParameters = {
        			"email" : sap.ui.getCore().getElementById('tfEmail').getValue(),
        			"firstname" : sap.ui.getCore().getElementById('tfFirstName').getValue(),
        			"lastname" : sap.ui.getCore().getElementById('tfLastName').getValue(),
        			"phone" : sap.ui.getCore().getElementById('tfPhone').getValue()
                  };

        	// Base URL of the REST service
        	var ServiceURL = "/SAP/bc/zdemojam/contact/";
               
			// Concatenate the Base URL and the contact's e-mail
			// Example: "<service-URL>/<KeyField>"
        	ServiceURL = ServiceURL + sap.ui.getCore().getElementById('tfEmail').getValue();

			// Send the request
			oModel.loadDataNew(ServiceURL, handleSuccess, handleError, oParameters);

   
			function handleSuccess(oData){
				if(oData.success==='false'){
					// Display message
					sap.ui.commons.MessageBox.alert(oData.msg);
				}else{
					// Close the dialog
					sap.ui.getCore().getElementById('Dialog').close();  
				}
			}

			function handleError(){
				// Display message
				sap.ui.commons.MessageBox.alert(arguments[0].statusText);
			}

        }}));

        oDialog.open();
	}

});