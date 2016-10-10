define(function (require, exports, module) {
    var scope = {}
    scope.init = function () {
        require(['widget-table-deferred'], function () {
            $(function() {
                $("#jsGrid").jsGrid({
                    width: "100%",
                    //filtering: true,
                    editing: true,
                    inserting: true,
                    sorting: true,
                    paging: true,
                    autoload: true,
                    pageSize: 15,
                    pageButtonCount: 5,
                    deleteConfirm: "Do you really want to delete the client?",
                    controller: db,
                    fields: [
                        { name: "Name", type: "text", width: 100},
                        { name: "Age", type: "number", width: 50 },
                        { name: "select2", type: "select2", width: 100, items: [
                            {
                                d: 'bella', v: '2'
                            }, {
                                d: 'bello', v: '1'
                            }, {
                                d: 'belle', v: '3'
                            }, {
                                d: 'belli', v: '4'
                            }, {
                                d: 'bellu', v: '5'
                            }, {
                                d: 'bellv', v: '6'
                            }]},
                        { name: "geo", type: "geo", width: 100/*, validate: "required"*/},
                        { name: "MyDate", type: "date", title: "MyDate" },
                        { name: "Address", type: "text", width: 200 },
                        { name: "Country", type: "select", items: db.countries, valueField: "Id", textField: "Name" },
                        { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
                        { name: "remark", type: "textarea", width: 100 },
                        { type: "control" }
                    ]
                })
            })
        })
    }
    return scope
})