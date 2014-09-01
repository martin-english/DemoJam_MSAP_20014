sap.ui.jsview("demojam1.demojam1", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf demojam1.demojam1
	*/ 
	getControllerName : function() {
		return "demojam1.demojam1";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf demojam1.demojam1
	*/ 
	createContent : function(oController) {

        // Creating the table control
        var oTable = new sap.ui.table.Table("tblctrl", {
                     title: "CRUD Application Example",
                     visibleRowCount: 10,
                     firstVisibleRow: 0,
                     selectionMode: sap.ui.table.SelectionMode.Single,
                     toolbar: new sap.ui.commons.Toolbar({
                                items: [
                                     new sap.ui.commons.Button({
                                               text: "Create",
                                               press: function() {
                                                    oController.Create();
                                               }
                                     }),
                                         
                                     new sap.ui.commons.Button({
                                               text: "Read",
                                               press: function() {
                                                    oController.Read();
                                               }
                                     }),
                                         
                                     new sap.ui.commons.Button({
                                               text: "Update",
                                               press: function() {
                                                    oController.Update();
                                               }
                                     }),
                                         
                                     new sap.ui.commons.Button({
                                               text: "Delete",
                                               press: function() {
                                                    oController.Delete();
                                               }
                                     }),
                                         
                                     new sap.ui.commons.Button({
                                               text: "Find",
                                               press: function() {
                                                    oController.Find();
                                               }
                                     })]
                      })
        });

		// Adding the table columns
		// Column E-mail
		// Column E-mail
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Email"}),
			template: new sap.ui.commons.Label().bindProperty("text", "email"),
			sortProperty: "email",
			filterProperty: "email",
			width: "20%"
		}));

		// Column First Name
		// Column First Name
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "First Name"}),
			template: new sap.ui.commons.TextField().bindProperty("value", "firstname"),
			sortProperty: "firstname",
			filterProperty: "firstname",
			width: "30%"
		}));

		// Column Last Name
		// Column Last Name
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Last Name"}),
			template: new sap.ui.commons.TextField().bindProperty("value", "lastname"),
			sortProperty: "lastname",
			filterProperty: "lastname",
			width: "30%"
		}));

		// Column Phone
		// Column Phone
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Text, Phone, etc"}),
			template: new sap.ui.commons.TextField().bindProperty("value", "phone"),
			sortProperty: "phone",
			filterProperty: "phone",
			width: "20%"
		}));

        // Creating the JSON Model - be aware that myJSONModel is an extended (custom)
        // version of the sap.ui.model.json.JSONModel
        var oModel = new myJSONModel;
              
        // Defining our model as global
        sap.ui.getCore().setModel(oModel);
              
        // Data Binding - here we are binding the table control
        // to the "data" attribute of the JSON Model
        oTable.bindRows("/data");
              
        // Returning the control(s) to place in the view     
        return [oTable];
	}

});
