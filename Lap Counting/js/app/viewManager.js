$(document).ready(function () {
    $('').kendoGrid({
    });
    $('#button-table').kendoGrid({
    });
    $("#tree").kendoTreeView({
        select: function (e) {
            var breadcrumb = [];
            var treeView = this;

            $(e.node)
                .parents("li")
                .andSelf()
                .each(function () {
                    var nodeText = $.trim(treeView.text(this));
                    breadcrumb.push(nodeText);
                });

            breadcrumb = breadcrumb.join(" > ");

            $("#breadcrumb").text(breadcrumb);
        }
    });
});
