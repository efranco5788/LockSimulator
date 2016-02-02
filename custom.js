function menu(){
	
	this.name;
	this.index;
	this.mainMenuIndex;
	this.submenuCount;
	this.submenusCreated;
	this.submenus;
			
}

function submenu(){
	
	this.name;
	this.index;
	this.mainMenuIndex;
	this.submenuCount;
	this.submenusCreated;
	this.submenus;
	
}

var simulatorJS = (function () {
    "use strict";
	var menuTrail = [];
	var menus = [];
	var mainMenuIsSetup = false;
	var mainMenuDisplayed = false;
	var submenuDisplayed = false;
	var buttonsPressed = [];
	
    return {
		
        getTotalMenus: function () {
            return menus.length;
        },
		
		
		clear: function () {
			menus = [];
			menuTrail = [];
			mainMenuIsSetup = false;
			mainMenuDisplayed = false;
			submenuDisplayed = false;
			location.reload(true); 
		},
		
		

        inputTotalMenus: function () {
            var isValid = false;
            
			while (!isValid) {
				
				var userInput = null;
				
				//Check if user entered a number
				while(userInput == null)
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
                                this.setEachMenuOption(totalNum);
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

        var menuFormColumn = $('#mainContainer').find('#menuColumn');
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
        menuForm.append('<button name="submitBtn_1" type="submit"  value="Submit" class="btn btn-default btn-lg" id="ID_submenuSubmitBtn">Submit');
        menuForm.append('</button>');
        menuForm.append('&nbsp;');
        menuForm.append('<button value="Rest" class="btn btn-default btn-lg" id="ID_submenuRestBtn" onclick="simulatorJS.clear()">Reset');
        menuForm.append('</button>'); 
		
		},
		
		
		
		// Function populates each main menu with its' properties
		submitMenusWithSubmenus: function () {
			
			    var fields = $(":input").serializeArray();
			    var name;
			    var count = 0;
				var newMenu;
			
			    jQuery.each(fields, function(i, field){
					
					name = $(field).attr('name');
				
				    field.value = field.value.trim();
				
				    if(name == "menuName")
				    {
						newMenu = new menu();
						newMenu.name = field.value;
					}
				    else if(name == "submenus")
					{
						newMenu.index = count;
						newMenu.submenuCount = field.value;
						newMenu.submenusCreated = false;
						newMenu.mainMenuIndex = null;
						menus.push(newMenu);
						
						count++
					}
					
					}); // End of foreach loop
					
			
			    this.drawMenus();
			    mainMenuIsSetup = true;
				alert('Menu Saved');
			    return false;
			
			 },
			 
			 
			 
		// Function creates the properties for each submenu	 
		submitSubmenusForMenu: function(menuNum) {
			
			var fields = $(":input").serializeArray();
			var currentMenu;
			var currentSubmenu;
			var tmpSubmenus = [];
			var count = 0;
			
			// check if your updating submenu for main menu
			if(menuTrail.length <= 1)
			{
				currentMenu = menus[menuNum];
			}
			else if(menuTrail.length > 1)
			{
				var tmpNum = menuTrail[0];
				currentMenu = menus[tmpNum];

				for(var i = 1; i < menuTrail.length; i++)
				{
					var num = menuTrail[i];
					var subs = currentMenu.submenus;
					var tmpSubmenu = subs[num];
					
					currentMenu = tmpSubmenu;
				}
				
			}
			
			jQuery.each(fields, function(i, field){
				
				// Get name of html tag
				name = $(field).attr('name');
				
				field.value = field.value.trim();
				
				if(name == "submenuName")
				{
					currentSubmenu = new menu();
					currentSubmenu.name = field.value;
				}
				else if(name == "submenuCount")
				{
					currentSubmenu.submenuCount = field.value;
					currentSubmenu.index = count;
					currentSubmenu.mainMenuIndex = menuTrail[0];
					tmpSubmenus.push(currentSubmenu);
					count++;
				}
				
			}); // End of foreach loop
					
				currentMenu.submenusCreated = true;
				currentMenu.submenus = tmpSubmenus;
				currentMenu.submenuCount = tmpSubmenus.length;
				
				var subCount = parseInt(currentMenu.submenuCount);
				//var subCount = parseInt(currentSubmenu.submenuCount);
			
				alert("Submenus saved");
				this.drawSubmenus(subCount, currentMenu);
				return false;
			
			 },			 
			 
			
			
			
			
			drawMenus: function () {
			
			var area = document.getElementById("simulatorTextDisplay");
			
			var menuText = '';
			
			menuText = menuText + ("\t\t\t\t" + 'Main Menu' + "\n");
			
			for(var count = 0; count < menus.length; count++)
			{
				var menuNumber = (count + 1);
				var m = menus[count];
				menuText = menuText + (menuNumber + '. ' + m.name + "\n");
			}
			
			area.value = menuText;
			mainMenuDisplayed = true;
			submenuDisplayed = false;
			},
			
			
			
			
			
			drawSubmenus: function(totalSubMenus, menuObject){
				
					var area = document.getElementById("simulatorTextDisplay");
					
					var menuText = '';
					
					$(area).val('');
					
					var subs = menuObject.submenus;
					
					if(subs !== undefined)
					{
						for(var count = 0; count < menuObject.submenuCount; count++)
						{
							var submenuNumber = (count + 1);
							var currentSubmenu = subs[count];
							var submenuName = currentSubmenu.name;
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
					

					menuObject.submenusCreated = true;
					mainMenuDisplayed = false;
					submenuDisplayed = true;
			},
			
			
			
			
				
			buttonClicked: function (btn) {
				
				if(mainMenuIsSetup){
					
					var btnClicked = $(btn).html();
					
					if(btnClicked == "enter")
					{
						// If main menu is being displayed
						if(mainMenuDisplayed == true)
						{
							if(buttonsPressed.length >= 1)
							{
								var buttonOption = '';
								var buttonValue = -1;
								
								jQuery.each(buttonsPressed, function(i, button){
									buttonOption = buttonOption + button;
								});
								
								buttonValue = parseInt(buttonOption);
								
								if(buttonValue <= menus.length)// get the value of the menu
								{
									var menuValue = (buttonValue - 1);
									menuTrail.push(menuValue);

									this.inputSubmenuNamesForMainMenu(menuValue);
								}
								
							}
							
						}
						else if(submenuDisplayed == true){
							
							if(buttonsPressed.length >= 1)
							{
								var buttonOption = '';
								var buttonValue;
								var submenuNum;
								
								var mainMenuIndex = menuTrail[0];
								
								jQuery.each(buttonsPressed, function(i, button){
									buttonOption = buttonOption + button;
								});
								
								buttonValue = parseInt(buttonOption);
								
								if(menuTrail.length == 1)
								{
									var mainMenu = menus[mainMenuIndex];
									var subCount = mainMenu.submenuCount;

									if(buttonValue <= subCount)
									{
										var submenus = mainMenu.submenus;
										submenuNum = (buttonValue - 1);
										var submenu = submenus[submenuNum];
										
										menuTrail.push(submenuNum);

										this.inputSubmenuNamesForSubmenu(submenu);
									}
								}
								else if(menuTrail.length > 1)
								{
									var currentMenu = menus[mainMenuIndex];
									
									// Loops through the menu trail and gets last index
									for(var i = 1; i < menuTrail.length; i++)
									{
										var num = menuTrail[i];
										var subs = currentMenu.submenus;
										var tmpSubmenu = subs[num];
										
										currentMenu = tmpSubmenu;
									}
									
									
									if(buttonValue <= currentMenu.submenuCount)
									{
										var submenus = currentMenu.submenus;
										submenuNum = (buttonValue - 1);
										var submenu = submenus[submenuNum];
										
										menuTrail.push(submenuNum);
										
										this.inputSubmenuNamesForSubmenu(submenu);
									}
									
							
								}
								
							}
							
						}
						
						//clear buttons pressed history
						buttonsPressed = [];
					}
					else if(btnClicked == "back")
					{
						this.redrawMenu();
						menuTrail = [];
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
				
				
				
				
			inputSubmenuNamesForMainMenu: function(menuNum){
					
					var menuFormColumn = $('#mainContainer').find('#menuColumn');
                    var menuForm = menuFormColumn.find('#menuOptionDescriptions');
					var menuObject = menus[menuNum];
					var subCount = parseInt(menuObject.submenuCount);
					var initialSubmenu_Set = menuObject.submenusCreated;
					
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
                    menuForm.append('<button name="submitBtn_1" type="button" value="Submit" class="btn btn-default btn-lg" id="ID_submenuSubmitBtn" onclick=' + 'simulatorJS.submitSubmenusForMenu(\'' + menuNum + '\')' + ' >Submit');
                    menuForm.append('</button>');
					
					return false;									
					
			},
			
			
			
			
			inputSubmenuNamesForSubmenu: function(sub_menu){
				
					var menuFormColumn = $('#mainContainer').find('#menuColumn');
                    var menuForm = menuFormColumn.find('#menuOptionDescriptions');
					var subCount = parseInt(sub_menu.submenuCount);
					var menus = sub_menu.submenus;
					var menuNum = sub_menu.index;
					
					$(menuForm).empty();
					
					this.drawSubmenus(subCount, sub_menu);
					
					for (var count = 0; count < subCount; count++) {
						
						var subMenuCountDisplay = (count + 1);

                        var label_SubNameID_Element = 'submenuLabel_' + menuNum;
                        var input_SubNameID_Element = 'inputSubmenuName_' + menuNum;
						
						//var menu = menus[count];
						//var menuObjectName = menu.name;
						//var menuObjectSubmenuCount = menu.submenuCount;
						
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
                    menuForm.append('<button name="submitBtn_1" type="button" value="Submit" class="btn btn-default btn-lg" id="ID_submenuSubmitBtn" onclick=' + 'simulatorJS.submitSubmenusForMenu(\'' + menuNum + '\')' + ' >Submit');
                    menuForm.append('</button>');
					
					return false;					
				
			},
				
				
				
				
			
			
			redrawMenu: function () {
					
					var menuFormColumn = $('#mainContainer').find('#menuColumn');
                    var menuForm = menuFormColumn.find('#menuOptionDescriptions');
					var menuNum = 0;
					
					$(menuForm).empty(); //Clear out the form first
					
					for (var count = 0; count < menus.length; count++) {
						
						menuNum = (count + 1);

                        var label_NameID_Element = 'menuLabel_' + menuNum;
                        var input_NameID_Element = 'inputName_' + menuNum;

                        var label_SubmenusID_Element = 'submenuLabel_' + menuNum;
                        var input_SubmenusID_Element = 'inputSubmenuCount_' + menuNum;
						
						var menuObject = menus[count];
						var menuObjectName = menuObject.name;
						var menuObjectSubmenuCount = menuObject.submenuCount;
						
						
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
                    menuForm.append('<button name="submitBtn_1" type="submit"  value="Submit" class="btn btn-default btn-lg" id="ID_submenuSubmitBtn">Submit');
                    menuForm.append('</button>');
                    menuForm.append('&nbsp;');
                    menuForm.append('<button value="Rest" class="btn btn-default btn-lg" id="ID_submenuRestBtn" onclick="simulatorJS.clear()">Reset');
                    menuForm.append('</button>');
					
					
					this.drawMenus();
					
			},
						
					
					
		
    }; // End of Return Statements

})();