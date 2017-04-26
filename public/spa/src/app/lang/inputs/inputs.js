define(function () {
    var init = function (id) {
        console.log('dashboard')
        console.log(id)

        $('#inputs-container-date-input').bootstrapMaterialDatePicker({ weekStart : 0, time: false });
    }
    return {
        init: init
    }
})
