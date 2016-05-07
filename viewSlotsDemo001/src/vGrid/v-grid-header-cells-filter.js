import {inject, customElement, bindable} from 'aurelia-framework';
import {VGrid} from './v-grid'


@customElement('v-grid-filter')
@inject(Element, VGrid)
export class VGridHeaderFilter {
  @bindable type;
  @bindable filterValue;


  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
    this.vGridConfig = vGrid.vGridConfig;
  }

  filterValueChanged(newValue, oldValue) {
    this.content.value = newValue;
    this.content.onchange({keyKode: 13});

    //checkbox
    if(this.vGridConfig.colTypeArray[this.parent.columnNo] === "checkbox"){
      if(newValue === ""){
        this.state = 0;
        this.content.style.opacity = 0.3;
        this.content.checked = false;
      }
    }

  }


  bind(parent) {
    this.parent = parent;
  }


  attached() {
    this.content = this.element.children[0];
    this.setStyle(this.content);
    this.content.onkeyup = this.parent.onKeyUpEventOnFilter.bind(this.parent);
    this.content.onchange = this.parent.onChangeEventOnFilter.bind(this.parent);
    this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
    this.content.value = this.filterValue ? this.filterValue : "";


    //this is just some crap to have checkbox in filter, maybe this should have been own custom element?
    if(this.vGridConfig.colTypeArray[this.parent.columnNo] === "checkbox"){
      //lets remove default
      this.element.removeChild(this.content);

      //create a container and and add it
      var container = document.createElement("div");
      this.element.appendChild(container);

      //set the standard styles to the container instead of checkbox, (for the white backgorunbd and borders)
      this.setStyle(container);


      //create new input and append it to container
      this.content = document.createElement("input");
      container.appendChild(this.content);


      this.content.onkeyup = this.parent.onKeyUpEventOnFilter.bind(this.parent);
      this.content.onchange = this.parent.onChangeEventOnFilter.bind(this.parent);
      this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
      this.content.value = this.filterValue ? this.filterValue : "";


      this.content.type = "checkbox";
      this.content.style.height = "100%";
      this.content.style.display = "block";
      this.content.style.margin = "auto";
      this.content.classList.add(this.vGridConfig.css.filterHandle)

      var value = this.filterValue ? this.filterValue : "";
      switch(value){
        case true || "true":
          this.state = 2;
          this.content.style.opacity = 1;
          this.content.checked = true;
          break;
        case false || "false":
          this.state = 3;
          this.content.style.opacity = 1;
          break;
        default:
          this.state = 0;
          this.content.style.opacity = 0.3;
      }


      this.content.onclick = ()=>{
        if(this.content.checked){
          if(this.state === 3){
            this.state = 0;
            this.content.style.opacity = 0.3;
            this.content.checked = false;
            this.filterValue = "";
          } else {
            this.state = 2;
            this.content.style.opacity = 1;
            this.filterValue = "true";
          }
        } else {
          this.state = 3;
          this.content.style.opacity = 1;
          this.filterValue = "false";
        }
      }

    }

  }


  setStyle(element) {

    var addClass = (name)=> {
      element.classList.add(name)
    };

    var setStyleTag = (tag, value)=> {
      element.style[tag] = value;
    };


    switch (this.type) {
      case "filterTop":
        addClass(this.vGridConfig.css.cellContent);
        addClass(this.vGridConfig.css.filterInputTop);
        addClass(this.vGridConfig.css.filterHandle);
        setStyleTag("line-height", `${this.vGridConfig.headerHeight / 2}px`);
        break;
      case "filterBottom":
        addClass(this.vGridConfig.css.cellContent);
        addClass(this.vGridConfig.css.filterInputBottom);
        setStyleTag("line-height", `${this.vGridConfig.headerHeight / 2}px`);
        break;
      default:
        break;
    }





  }


}
