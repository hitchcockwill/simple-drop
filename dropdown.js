(function($) {
   $.fn.customDropdown = function() {

      return this.each(function() {
         var $this = $(this);
         var $input;
         var $list;
         var $listItems;
         var $wrap;

         //Init
         buildList();

         // build the dropdown list
         function buildList() {
            //adds a wrapper div for all markup and hides select tag
            $this.hide().wrap("<div class='dropdownWrap span2' />");
            var selected = $this.children(":first").text();
            var list = "<div class='new-list'>\n<ul>\n";

            // builds list of all options
            $this.children().each(function() {
               var option = $(this);
               list += "<li data-id='" + option.attr("data-id") + "'>" + option.text();
               +"</li>\n";
            });
            list += "</ul>\n<form class='clearfix'>\n";
            list += "<input type='text' title='Add new list' value='Add new list' class='floatLeft newListInput' />\n"
            list += "<input type='submit' value='add' class='button floatLeft'/>\n</form>";

            $wrap = $this.closest("div.dropdownWrap");

            // append list to dropdown wrapper and set width to match input
            $wrap.append("<input readonly='readonly' class='listselect' value='" + selected + "'></input>\n" + list).children(".new-list").css({width: $wrap.children("input").innerWidth()});

            $list = $wrap.children("div.new-list");
            $input = $wrap.children("input.listselect");
         }

         //open the dropdown list
         function openList() {
            $list.fadeIn("fast");
         }

         //close the dropdown list
         function closeList() {
            $list.fadeOut("fast");
         }

         // select an element
         function selectItem(target) {
            $input.attr({
               "value": target.text(),
               "data-id": target.attr("data-id")
            });
         }

         function addNewItem(target) {
            $input.attr("value", target.attr("value"));
            $(".dropdownWrap ul").each(function() {
               $(this).prepend("<li>" + target.attr("value") + "</li>\n");
            });
         }

         // Event handlers

         $("html").on("click", function(e) {
            var $target = $(e.target);
            if ($target.is($wrap) || $target.parents().is($wrap)) {
               return false;
            }
            else {
               closeList();
            }
         });
         $input.on("click", function() {
            openList();
         });
         $wrap.find("ul").on("click", "li", function() {
            selectItem($(this));
            closeList();
         });
         $wrap.find("input.button").on("click", function() {
            addNewItem($(this).siblings("input"));
            closeList();
         });
         
         $("input.newListInput").focus(function(){ 
            console.log("focus")
           var input = $(this);
           if(input.attr("value") === input.attr("title")) {
             input.attr("value","");
           }
         }).blur(function(){
           var input = $(this);
           if(input.attr("value") === "" || input.attr("value") === "undefined") {
             var thisValue = input.attr("title");
             input.attr("value", thisValue);
           }
         });

      });

   };
})(jQuery);