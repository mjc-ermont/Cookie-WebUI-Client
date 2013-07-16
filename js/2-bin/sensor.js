function Sensor (options) {
    this._values= [];
    this._id_val_no_value= [];
    this.name= options.name;
    this.current_value = 0
    
    this.addValue= function (value){
        var id_val = (this._values.push(value)-1);
        var ids = value.getIds();
        for (var j in ids){
            this._id_val_no_value[ids[j]] = id_val;
        }
    };
    this.setValue= function (id_val) {
        this.current_value = id_val;
        this._values[id_val].setUp();
    };
    this.addData= function (id_val, data){
        id_val = parseInt(id_val, 10);
        if (typeof this._values[this._id_val_no_value[id_val]] !== "undefined"){
            this._values[this._id_val_no_value[id_val]].addData(id_val, data);
        }
    };
    this.getValues= function () {
        var names = [];
        for (var i in this._values){
            names.push(this._values[i].getName());
        }
        return names;
    };
    this.getViews= function () {
        return this._values[this.current_value].getViews();
    };
    this.refresh = function () {
        this._values[this.current_value].refresh();
    };
    this.setView = function (id_view) {
        this._values[this.current_value].setView(id_view);
    }
    
    for (var i in options.values){
        this.addValue(new Value(options.values[i]));
    }
}