$(function() {
    var treeListData = $.map(tasks, function(task, _) {
        task.Data_Assigned_Employee = null;
        $.each(employees, function(_, employee) {
            if(employee.ID == task.Data_Assigned_Employee_ID)
                task.Data_Assigned_Employee = employee;
        });
        return task;
	});
	
    $("#tasks").dxTreeList({
        dataSource: treeListData,
        keyExpr: "Data_ID",
        parentIdExpr: "Data_Parent_ID",
        columnAutoWidth: true,
        wordWrapEnabled: true,
        showBorders: true,
        expandedRowKeys: [1, 2],
        selectedRowKeys: [1, 29, 42],
        searchPanel: {
            visible: true,
            width: 250
        },
        headerFilter: {
            visible: true
        },
        selection: {
            mode: "multiple"
        },
        columnChooser: {
            enabled: true
        },
        columns: [{
            dataField: "Data_Role",
            caption: "Role",
            minWidth: 100,
            lookup: {
                dataSource: roles,
                valueExpr: "id",
                displayExpr: "value"
            },
            visible: false
        },{
            dataField: "Data_Role_Name",
            width: 200
        }, {
            dataField: "Data_Assigned_Employee_ID",
            caption: "Collaborator",
            allowSorting: false,
            minWidth: 200,
            cellTemplate: function(container, options) {
                var currentEmployee = options.data.Data_Assigned_Employee;
                if(currentEmployee) {
                    container
                        .append($("<div>", { "class": "img", style: "background-image:url(" + currentEmployee.Picture + ");" }))
                        .append("\n")
                        .append($("<span>", { "class": "name", text: currentEmployee.Name }));
                }
            },
            lookup: {
                dataSource: employees,
                valueExpr: "ID",
                displayExpr: "Name"
            }
        }, {
            dataField: "Data_Status",
            caption: "Status",
            minWidth: 100,
            lookup: {
                dataSource: stat,
                valueExpr: "id",
                displayExpr: "value"
            },
            visible: false
        },
           { dataField: "Data_Priority",
            caption: "Priority",
            lookup: {
                dataSource: priorities,
                valueExpr: "id",
                displayExpr: "value"
            },
            visible: false
        }, {
            dataField: "Data_Completion",
            caption: "% Completed",
            customizeText: function(cellInfo) {
                return cellInfo.valueText + "%";
            },
            visible: false
        }, {
            dataField: "Data_Start_Date",
            caption: "Start Date",
            dataType: "date"
        }, {
            dataField: "Data_Due_Date",
            caption: "Due Date",
            dataType: "date"

        }]
    });
});