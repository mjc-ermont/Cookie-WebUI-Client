function Value (options) {
    this._data= [];
    this._views= [];
    this.last_data_refreshed= [];
    this.current_view= 0;
    this.name= options.name;
    this.unit= options.unit;
    this.ids = options.ids;
    for (var j in this.ids){
        this._data[j] = [];
    }

    this.setUp= function () {
        $("views").html("");
        for (i in this._views){
            $("#views").append("<li><a href='#' onclick='changeview()'>" + this._views[i].name + "</a></li>");
        }
        this.setView(0);
    };
    
    this.addData= function (id_val, data){
        id_val = parseInt(id_val, 10);
        this._data[this.ids.indexOf(id_val)][this._data[this.ids.indexOf(id_val)].length] = data;
    };
    
    this.addView= function (view){
        this._views.push(view);
    };
    
    this.setView= function (view_id){
        this.current_view = view_id;
        for (var i in this._data){
            this.last_data_refreshed[i] = this._data[i].length;
        }
        this._views[view_id].setUp(this._data);
    };
    
    this.refresh= function (){
        var data = [];
        for (var i in this._data){
            data[i] = this._data[i].slice(this.last_data_refreshed[i]);
        }
        this._views[this.current_view].refresh(data);
        for (var j in this._data){
            this.last_data_refreshed[j] = this._data[j].length;
        }
    };
    
    this.getViews= function (){
        var names = [];
        for (var i in this._views){
            names.push(this._views[i].getName());
        }
        return names;
    };
    
    this.getName= function () {
        return this.name;
    };
    
    this.getIds = function () {
        return this.ids;
    };
    
    for (var i in options.views){
        this.addView(options.views[i]);
    } 
}