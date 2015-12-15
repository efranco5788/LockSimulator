var simulatorJS = (function () {
    "use strict";
    var totalMenus = [];
	var mainMenuIsSetup = false;
	var mainMenuDisplayed = false;
	var buttonsPressed = [];
	var submenu_Key = "submenus";
	
    return {
		
        getTotalMenus: function () {
			var total = totalMenus.length;
            return total;
        },
		
		
		setTotalMenus: function (num) {
			totalMenus.length = num; 
		},
		
		
		
		clear: function () {
			totalMenus = [];
			mainMenuIsSetup = false;
			mainMenuDisplayed = false;
			location.reload(true); 
		},
		
		

        inputTotalMenus: function () {
            var isValid = false;
            
			while (!isValid) {
				
				var userInput = null;
				
				while(userInput == null) //Check if user did not enter a number
				{
					userInput = prompt("Please enter a positive whole number for your total number of menu options.", "1");
				}
				
                var totalNum = userInput.trim();

                if (totalNum.length === 0 || !totalNum) {

                    isValid = false;

                } 
				else {

                    var isNum = isNaN(totalNum);
                    if (isNum) {
                        isValid = false;
                    } 
					else {

                        if (totalNum > 0) {

                            if (totalNum % 1 === 0) {
                                this.setTotalMenus(totalNum);
                                this.setEachMenuOption(totalMenus.length);
                                isValid = true;
                            } 
							else {
                                isValid = false;
                            }

                        } 
						else {
                            isValid = false;
                        }

                    }

                }
            } 
		},
		
	
	    
		
		setEachMenuOption: function (num) {

        var menuFormColumn = $('#mainTable').find('#menuColumn');
        var menuForm = menuFormColumn.find('#menuOptionDescriptions');

        var menuNum = 0;
		
		$(menuForm).empty(); //Clear out the form first

        for (var count = 0; count < num; count++) {
            menuNum = (count + 1);

            var label_NameID_Element = 'menuLabel_' + menuNum;
            var input_NameID_Element = 'inputName_' + menuNum;

            var label_SubmenusID_Element = 'submenuLabel_' + menuNum;
            var input_SubmenusID_Element = 'inputSubmenuCount_' + menuNum;

            menuForm.append('<p>');
            menuForm.append('<label class="menuOption" id=' + label_NameID_Element + '>');
            menuForm.append('<strong>' + 'Menu Option ' + menuNum + ':' + '</strong>');
            menuForm.append('<br>');
            menuForm.append('Name: ');
            menuForm.append('</label>');
            menuForm.append('<input required name="menuName" ' + 'type="text" id=' + input_NameID_Element + '>');
            menuForm.append('</input>');

            menuForm.append('<br>');
            menuForm.append('<label class="submenuCountOption" id=' + label_SubmenusID_Element + '>');
            menuForm.append('Number of Submenus: ');
            menuForm.append('</label>');
            menuForm.append('<input required name="submenus" ' + 'type="number" min="1" max="10" id=' + input_SubmenusID_Element + '>');
            menuForm.append('</input>');
            menuForm.append('</p>');
        }

        menuForm.append('<br>');
        menuForm.append('<button name="submitBtn_1" type="submit"  value="Submit" class="submenuBtns" id="ID_submenuSubmitBtn">Submit');
        menuForm.append('</button>');
        menuForm.append('&nbsp;');
        menuForm.append('<button value="Rest" class="submenuBtns" id="ID_submenuRestBtn" onclick="simulatorJS.clear()">Reset');
        menuForm.append('</button>'); 
		
		},
		
		
		
		
		submitMenusWithSubmenus: function () {
			
			    var fields = $(":input").serializeArray();
			    var name;
			    var count = 0;
			    var currentMenu = {};
			
			    jQuery.each(fields, function(i, field){
					name = $(field).attr('name');
				
				    field.value = field.value.trim();
				
				    if(name == "menuName")
				    {
						currentMenu["name"] = field;
					}
				    else if(name == "submenus")
					{
					    currentMenu["submenuCount"] = field;
						currentMenu["initialSubmenuSet"] = false;
						currentMenu["index"] = count;
					    totalMenus[count] = currentMenu;
					    count++;
					    currentMenu = {};	
					}
					
					}); // End of foreach loop
			
			    this.drawMenus();
			    mainMenuIsSetup = true;
				alert('Menu Saved');
			    return false;
			
			 },
			 
			 
			 
			 
		submitSubmenusForMenu: function(menuNum) {
			
			var currentMenu = totalMenus[menuNum];
			var fields = $(":input").serializeArray();
			var submenus = {};
			
			jQuery.each(fields, function(i, field){
				
				name = $(field).attr('name');
				
				field.value = field.value.trim();
				submenus[i] = field.value;
				
				if(name == "submenuName")
				{
					
				}
				else(name == "submenuCount")
				{
					
				}
				
			}); // End of foreach loop
					
				currentMenu["initialSubmenuSet"] = true;
				currentMenu['submenus'] = submenus;
				
				var submenuCount = parseInt(currentMenu["submenuCount"].value);
				
				this.drawSubmenus(submenuCount, currentMenu);
				
				return false;
			
			 },			 
			 
			
			
			
			
			drawMenus: function () {
			var area = document.getElementById("simulatorTextDisplay");
			var menuText = '';
			
			
			jQuery.each(totalMenus, function(i, menu){
				var menuNumber = (i + 1);
				menuText = menuText + (menuNumber + '. ' + menu.name.value + "\n");
			});
			
			area.value = menuText;
			mainMenuDisplayed = true;
			},
			
			
			
			drawSubmenus: function(totalSubMenus, menuObject){
				
					var area = document.getElementById("simulatorTextDisplay");
					
					var menuText = '';
					
					$(area).val('');
					
					var submenus = menuObject["submenus"];
					if(submenus !== undefined)
					{
						for(var count = 0; count < totalSubMenus; count++)
						{
							var submenuNumber = (count + 1);
							var submenuName = submenus[count];
							menuText = menuText + (submenuNumber + '. ' + submenuName + "\n");
						}
						
						area.value = menuText;	
					}
					else
					{
						for(var count = 0; count < totalSubMenus; count++)
						{
							var submenuNumber = (count + 1);
							menuText = menuText + (submenuNumber + '. ' + "\n");	
						}
						
						area.value = menuText;	
					}
					

					//area.value = menuText;
					menuObject["initialSubmenuSet"] = true;	
					mainMenuDisplayed = false;
			},
			
			
			
			
			
			
			buttonClicked: function (btn) {
				
				if(mainMenuIsSetup){
					
					var btnClicked = $(btn).html();
					
					if(btnClicked == "enter")
					{
						if(mainMenuDisplayed == true) // If main menu is being displayed
						{
							if(buttonsPressed.length >= 1)
							{
								var buttonOption = '';
								var buttonValue = -1;
								
								jQuery.each(buttonsPressed, function(i, button){
									buttonOption = buttonOption + button;
								});
								
								buttonValue = parseInt(buttonOption);
								
								if(buttonValue <= totalMenus.length)
								{
									var menu = (buttonValue - 1);
									this.inputSubmenuNames(menu);
								}
								
							}
							
							buttonsPressed = []; //clear buttons pressed history
						}
						else{
							buttonsPressed = []; // clear buttons pressed history
						}
					}
					else if(btnClicked == "back")
					{
						this.redrawMenu();
						buttonsPressed = [];
					}
					else
					{
						buttonsPressed.push(btnClicked);
					}
					
				} // end of if main menu is setup statement
				else{
					buttonsPressed = [];
				}
				
			},
				
				
				
				
			inputSubmenuNames: function(menuNum){
					
					var menuFormColumn = $('#mainTable').find('#menuColumn');
                    var menuForm = menuFormColumn.find('#menuOptionDescriptions');
					var menuObject = totalMenus[menuNum];
					var subCount = parseInt(menuObject['submenuCount'].value);
					var initialSubmenu_Set = menuObject["initialSubmenuSet"];
					
					$(menuForm).empty();
					
					this.drawSubmenus(subCount, menuObject);
					
					for (var count = 0; count < subCount; count++) {
						
						var subMenuCountDisplay = (count + 1);

                        var label_SubNameID_Element = 'submenuLabel_' + menuNum;
                        var input_SubNameID_Element = 'inputSubmenuName_' + menuNum;
						
						menuForm.append('<p>');
                        menuForm.append('<label class="submenuOption" id=' + label_SubNameID_Element + '>');
                        menuForm.append('<strong>' + 'Submenu Option ' + subMenuCountDisplay + ':' + '</strong>');
                        menuForm.append('<br>');
                        menuForm.append('Name: ');
                        menuForm.append('</label>');
                        menuForm.append('<input required name="submenuName" ' + 'type="text" id=' + input_SubNameID_Element + ">");
                        menuForm.append('</input>');
						menuForm.append('<br>');
                        menuForm.append('<label class="submenuCountOption">');
                        menuForm.append('Number of Submenus: ');
                        menuForm.append('</label>');
                        menuForm.append('<input required name="submenuCount" ' + 'type="number" min="1" max="10">');
                        menuForm.append('<br>');
                        
						menuForm.append('</p>');
						
					}
					
					menuForm.append('<br>');
                    menuForm.append('<button name="submitBtn_1" type="button" value="Submit" class="submenuBtns" id="ID_submenuSubmitBtn" onclick=' + 'simulatorJS.submitSubmenusForMenu(\'' + menuNum + '\')' + ' >Submit');
                    menuForm.append('</button>');
					
					return false;									
					
			},
				
				
				
				
			redrawMenu: function () {
					
					var menuFormColumn = $('#mainTable').find('#menuColumn');
                    var menuForm = menuFormColumn.find('#menuOptionDescriptions');
					var menuNum = 0;
					
					$(menuForm).empty(); //Clear out the form first
					
					for (var count = 0; count < totalMenus.length; count++) {
						
						menuNum = (count + 1);

                        var label_NameID_Element = 'menuLabel_' + menuNum;
                        var input_NameID_Element = 'inputName_' + menuNum;

                        var label_SubmenusID_Element = 'submenuLabel_' + menuNum;
                        var input_SubmenusID_Element = 'inputSubmenuCount_' + menuNum;
						
						var menuObject = totalMenus[count];
						var menuObjectName = menuObject['name'].value;
						var menuObjectSubmenuCount = menuObject['submenuCount'].value;
						
						
						menuForm.append('<p>');
                        menuForm.append('<label class="menuOption" id=' + label_NameID_Element + '>');
                        menuForm.append('<strong>' + 'Menu Option ' + menuNum + ':' + '</strong>');
                        menuForm.append('<br>');
                        menuForm.append('Name: ');
                        menuForm.append('</label>');
                        menuForm.append('<input required name="menuName" ' + 'type="text" id=' + input_NameID_Element + ' value=' + '"' + menuObjectName + '"' + ">");
                        menuForm.append('</input>');

                        menuForm.append('<br>');
                        menuForm.append('<label class="submenuCountOption" id=' + label_SubmenusID_Element + '>');
                        menuForm.append('Number of Submenus: ');
                        menuForm.append('</label>');
                        menuForm.append('<input required name="submenus" ' + 'type="number" min="1" max="10" id=' + input_SubmenusID_Element + ' value=' + '"' + menuObjectSubmenuCount + '"'+ '>');
                        menuForm.append('</input>');
                        menuForm.append('</p>');
						
					}
					
					menuForm.append('<br>');
                    menuForm.append('<button name="submitBtn_1" type="submit"  value="Submit" class="submenuBtns" id="ID_submenuSubmitBtn">Submit');
                    menuForm.append('</button>');
                    menuForm.append('&nbsp;');
                    menuForm.append('<button value="Rest" class="submenuBtns" id="ID_submenuRestBtn" onclick="simulatorJS.clear()">Reset');
                    menuForm.append('</button>');
					
					
					this.drawMenus();
					
			},
					
					
					
					
			redrawSubmenuForm: function(totalSubMenus, menuObject){
				
					var menuFormColumn = $('#mainTable').find('#menuColumn');
                    var menuForm = menuFormColumn.find('#menuOptionDescriptions');
					
					$(menuForm).empty();
					
					var submenus = menuObject['submenus'];
					
					for(var i = 0; i < totalSubMenus; i++)
					{
						var subMenuCountDisplay = (count + 1);

                        var label_SubNameID_Element = 'submenuLabel_' + subMenuCountDisplay;
                        var input_SubNameID_Element = 'inputSubmenuName_' + subMenuCountDisplay;
						
						menuForm.append('<p>');
                        menuForm.append('<label class="submenuOption" id=' + label_SubNameID_Element + '>');
                        menuForm.append('<strong>' + 'Submenu Option ' + subMenuCountDisplay + ':' + '</strong>');
                        menuForm.append('<br>');
                        menuForm.append('Name: ');
                        menuForm.append('</label>');
                        menuForm.append('<input required name="submenuName" ' + 'type="text" id=' + input_SubNameID_Element + ">");
                        menuForm.append('</input>');
                        menuForm.append('</p>');								
					}
					
					mainMenuDisplayed = false;
					
			}					
					
					
					
		
    }; // End of Return Statements

})();