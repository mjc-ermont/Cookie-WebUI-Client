function Balloon(options) {
    this.sensors = [];
    this.current_sensor = 0;
    this.current_value = 0;

    
    this.addSensor = function (sensor) {
        this.sensors.push(sensor);
    };
    
    this.addData = function (data) {
        for (var no_capt in data){
            if (typeof this.sensors[no_capt] !== "undefined"){
                for (var no_val in data[no_capt]){
                    for (var i in data[no_capt][no_val]){
                        this.sensors[no_capt].addData(no_val, data[no_capt][no_val][i]);
                    }
                }
            }
        }
    };
    
    this.setValue = function (id_capt, id_val) {
        this.current_sensor = id_capt;
        this.current_value = id_val;
        this.sensors[id_capt].setValue(id_val);
    };
    
    this.getValues = function () {
        var values = {};
        for (var i in this.sensors){
            values[this.sensors[i].name] = this.sensors[i].getValues();
        }
        return values;
    };
    this.refresh  = function () {
        this.sensors[this.current_sensor].refresh();
    };
    
    for (var j in options.sensors){
        this.addSensor(new Sensor(options.sensors[j]));
    }

}