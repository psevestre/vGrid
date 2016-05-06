/*****************************************************************************************************************
 *    VGridCellRow
 *    Custom element controlling the cell logic
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, noView, customElement, processContent, bindable} from 'aurelia-framework';
import {VGrid} from './v-grid'


//should I make this into a container and have cells under it?


@noView
@customElement('v-grid-cell-row')
@processContent(false)
@inject(Element, VGrid)
export class VGridCellRow {
  @bindable columnNo;
  @bindable configAttribute;


  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
    this.hidden = false;
    this.displayRawValue = false;
    this.isRealFocus = false;
  }


  bind(bindingContext) {
    this.bindingContext = bindingContext;
    if (this.bindingContext && this.cellContent) {
      this.setStyle(); //need to reset this incase they have binded attributes
      this.rawValue = this.bindingContext[this.attribute()];
      this.setValue("");
      this.setValue(this.rawValue);
      if (this.vGrid.vGridCurrentRow === parseInt(this.element.parentNode.getAttribute("row"))) {
        if (parseInt(this.columnNo) === this.vGrid.vGridCellHelper.index) {
          if (!this.containsFocusClass(this.element)) {
            this.setLastFocusElement(null);
            this.setCss();
            //this.cellContent.focus();//this will only steal focus, disable for now
          }
        }
      }
    }
  }


  interpolate(str) {
    if(str){
      return function interpolate(o) {
        return str.replace(/{{([^{}]*)}}/g, function (a, b) {
          var r = o[b];
          return r;
        });
      }
    } else {
      return function(){
        return ""
      }
    }

  }


  created() {

  }


  attached() {

    this.setStandardClassesAndStyles();

    var that = this;

    switch (this.colType()) {
      case "image":
        this.cellContent = document.createElement("img");
        break;
      case "checkbox":
        this.cellContent = document.createElement("input");
        this.cellContent.type = "checkbox";
        this.cellContent.onclick = function (e) {
          if (this.readOnly() === true && e.keyCode !== 9) {
            return false;
          } else {
            if (!this.editMode()) {
              return false;
            } else {
              return true;
            }
          }
        }.bind(this);
        break;
      default:
        this.cellContent = document.createElement("input");

    }


    this.cellContent.onkeydown = function (e) {
      if (e.keyCode == 13) {
        if (this.containsWriteClass(this.element)) {
          this.removeWriteClass(this.element)
        }
        this.cellContent.onblur();
        this.setEditMode(false);
        this.removeWriteClass(this.element);
        this.addFocusClass(this.element);
        this.vGrid.vGridCurrentEntity[this.attribute()] = this.rawValue; //just for triggering update
        return false;
      }
      if (this.readOnly() === true && e.keyCode !== 9) {
        return false;
      } else {
        if (!this.editMode()) {
          return false;
        } else {
          return true;
        }
      }
    }.bind(this);



    this.cellContent.ondblclick = function (e) {
      this.setEditMode(true);
      if (this.cellContent.select) {
        this.cellContent.select()
      }
    }.bind(this);


    this.cellContent.addEventListener("cellFocus", function (e) {
      if (this.editMode()) {
        if (this.editRaw()) {
          if (!this.displayRawValue) {
            this.setValue(null, true);
            this.isRealFocus = true;
          }
        }
      }
      this.setCss();
      this.cellContent.focus();
    }.bind(this));

    //todo: clean this up more
    this.cellContent.onblur = function (e) {
      if (this.editMode()) {
        if (this.editRaw()) {
         var canUpdate = true;
          if(this.isRealFocus) {
            this.vGrid.vGridCellHelper.updateActual({
              attribute: this.attribute(),
              value: this.valueFormater ? this.valueFormater.fromView(this.cellContent.value) : this.cellContent.value
            });
            this.rawValue = this.cellContent.value;
           
            this.setValue(null, true)//this.cellContent.value);
            this.setCss();
          }
        } else {
          this.vGrid.vGridCellHelper.updateActual({
            attribute: this.attribute(),
            value: this.getValue()
          });
          this.rawValue = this.getValue();
        }
      } else {

      }

      if(this.isRealFocus === false){
        this.vGrid.vGridCurrentEntity[this.attribute()] = this.rawValue;
      }


      this.isRealFocus = false;
    }.bind(this);


    this.cellContent.onchange = function (e) {
      console.log("changed")
    }.bind(this);


    this.cellContent.onClick = function (e) {
      //todo
    }.bind(this);

    this.setStyle()




    if (this.bindingContext) {
      this.setValue(this.bindingContext[this.attribute()])
    }
    this.element.appendChild(this.cellContent);


  }


  setStyle(){
    //so materilize dont mess up
    this.cellContent.style.opacity = "initial";
    this.cellContent.style.border = "initial";
    this.cellContent.style.transition = "initial";

    //set class/style
    this.cellContent.classList.add(this.vGrid.vGridConfig.css.cellContent);
    this.cellContent.setAttribute(this.vGrid.vGridConfig.atts.dataAttribute, this.attribute());
    this.cellContent.setAttribute("style",this.interpolate(this.vGrid.vGridConfig.colStyleArray[this.columnNo])(this.bindingContext));
    this.cellContent.setAttribute("readonly", "true");


    if (this.colType() === "checkbox") {
      this.cellContent.style.heigth = "initial";
      this.cellContent.style.width = "initial";
      this.cellContent.style.margin = "auto"
      this.cellContent.style.display = "block"
    }

    this.cellContent.setAttribute("tabindex", "0");
  }

  /**************************************************
   set/get value and hide cell if not defined value
   */
  setValue(value, setRawValue) {
    this.removeCssCell();
    switch (this.colType()) {
      case "image":
        this.hideIfUndefined(value);
        if (value !== undefined && value !== null) {
          this.cellContent.src = value;
        }
        break;
      case "checkbox":
        this.hideIfUndefined(value);
        this.cellContent.checked = value === "true" || value === true ? true : false;
        break;
      default:
        this.hideIfUndefined(value);
        if (setRawValue) {
          this.cellContent.value = this.rawValue;
          this.displayRawValue = true;
        } else {
          this.cellContent.value = this.valueFormater ? this.valueFormater.toView(value) : value;
          this.displayRawValue = false;
        }
    }
  }


  getValue() {
    switch (this.colType()) {
      case "image":
        return this.cellContent.src;
        break;
      case "checkbox":
        return this.cellContent.checked;
        break;
      default:
        return this.valueFormater ? this.valueFormater.fromView(this.cellContent.value) : this.cellContent.value;
    }
  }


  hideIfUndefined(value) {
    if (value === undefined) {
      this.hidden = true;
      this.cellContent.style.display = "none";
      this.removeCssOldCell();
    } else {
      if (this.cellContent.style.display === "none") {
        this.hidden = false;
        this.cellContent.style.display = "block";
      }
      this.cellContent.src = value;
    }
  }


  /**************************************************
   basic types/atts
   */


  editMode() {
    return this.vGrid.vGridCellHelper.editMode;
  }


  setEditMode(value) {
    this.vGrid.vGridCellHelper.editMode = value;
  }

  editRaw() {
    return this.vGrid.vGridConfig.colEditRawArray[this.columnNo];
  }


  attribute() {
    return this.vGrid.vGridConfig.attributeArray[this.columnNo];
  }

  get valueFormater() {
    return this.vGrid.vGridConfig.colFormaterArray[this.columnNo];
  }

  readOnly() {
    return this.vGrid.vGridConfig.readOnlyArray[this.columnNo];
  }

  colType() {
    return this.vGrid.vGridConfig.colTypeArray[this.columnNo];
  }


  /**************************************************
   this and last element
   */

  getLastFocusElement() {
    return this.vGrid.vGridCellHelper.lastElement;
  }


  setLastFocusElement(element) {
    this.vGrid.vGridCellHelper.lastElement = element;
    if (this.editMode()) {
      this.lastEdit = true;
    } else {
      this.lastEdit = false;
    }

  }


  /**************************************************
   get and set classes
   */



  containsFocusClass(element) {
    if (element) {
      return element.classList.contains(this.vGrid.vGridConfig.css.editCellFocus)
    } else {
      return false;
    }
  }


  addFocusClass(element) {
    if (element) {
      this.cellContent.setAttribute("readonly", "true");
      element.classList.add(this.vGrid.vGridConfig.css.editCellFocus)
    } else {
      return false;
    }
  }


  removeFocusClass(element) {
    if (element) {
      element.classList.remove(this.vGrid.vGridConfig.css.editCellFocus)
    } else {
      return false;
    }
  }


  containsWriteClass(element) {
    if (element) {
      return element.classList.contains(this.vGrid.vGridConfig.css.editCellWrite)
    } else {
      return false;
    }
  }


  addWriteClass(element) {
    if (element) {
      this.cellContent.removeAttribute("readonly");
      element.classList.add(this.vGrid.vGridConfig.css.editCellWrite)
    } else {
      return false;
    }
  }


  removeWriteClass(element) {
    if (element) {


      element.classList.remove(this.vGrid.vGridConfig.css.editCellWrite)
    } else {
      return false;
    }
  }

  removeCssCell() {
    if (this.containsWriteClass(this.element)) {
      this.removeWriteClass(this.element);
    }
    if (this.containsFocusClass(this.element)) {
      this.removeFocusClass(this.element);
    }
  }


  removeCssOldCell() {
    if (this.containsWriteClass(this.getLastFocusElement())) {
      this.removeWriteClass(this.getLastFocusElement());
    }
    if (this.containsFocusClass(this.getLastFocusElement())) {
      this.removeFocusClass(this.getLastFocusElement());
    }
  }


  setCss() {
    if (!this.containsFocusClass(this.element)) {
      this.addFocusClass(this.element);
      this.removeCssOldCell();
      this.setLastFocusElement(this.element)
    }

    if (this.editMode() && !this.readOnly()) {
      if (!this.containsWriteClass(this.element)) {
        this.removeFocusClass(this.element);
        this.addWriteClass(this.element);
      }
    }
  }

  setStandardClassesAndStyles() {
    var css = this.vGrid.vGridConfig.css;
    var cellStyle = `width:${this.vGrid.vGridConfig.columnWidthArray[this.columnNo]}px`;
    this.element.classList.add(css.rowCell);
    this.element.classList.add(css.rowColumn + this.columnNo);
    this.element.classList.add(css.gridColumn + this.columnNo);
    this.element.setAttribute("style", cellStyle);
  }


}
