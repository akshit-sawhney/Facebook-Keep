Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
}
var OuterContainer = React.createClass({
    getInitialState: function() {
        return {
            labelValue: "",
            titleValue: "",
            noteValue: "",
            keepData: []
        }
    },componentDidMount: function() {
            this.loadContent();
    },
    loadContent: function() {
        var database = firebase.database();
        var starCountRef = firebase.database().ref('/');
        var self = this
        starCountRef.on('value', function(snapshot) {
            var allResults = snapshot.val();
            var formattedData = [];
            for(var singleValue in allResults) {
                var blankObject = {
                    "key": 0,
                    "label": "",
                    "title": "",
                    "text": "",
                    "display": "",
                    "color": ""
                };
                blankObject.key = parseInt(singleValue.slice(1, -1));
                blankObject.label = allResults[singleValue].label;
                blankObject.title = allResults[singleValue].title;
                blankObject.text = allResults[singleValue].text;
                blankObject.display = allResults[singleValue].display;
                blankObject.color = allResults[singleValue].color;
                formattedData.push(blankObject);
            }
            self.setState({
                labelValue: "",
                titleValue: "",
                noteValue: "",
                keepData: formattedData
            });
        });
    },
    newKeep: function(titleValueNew, noteValueNew, newTitle, newKeep) {
        this.setState( {
            labelValue: "",
            titleValue: "",
            noteValue: "",
            keepData: newKeep
        })
    },
    updateKeep: function(titleValueNew, noteValueNew, newTitle, newKeep) {
        this.setState( {
            labelValue: "",
            titleValue: "",
            noteValue: "",
            keepData: newKeep
        })
    },
    discardThis: function(newKeep) {
        this.setState( {
            labelValue: "",
            titleValue: "",
            noteValue: "",
            keepData: newKeep
        })
    },
    filterThis: function(filteredKeep) {
        this.setState( {
            labelValue: "",
            titleValue: "",
            noteValue: "",
            keepData: filteredKeep
        })
    },
    render: function() {
        return (
            <div className="mainDiv">
                <KeepInput keepNotePass={this.newKeep} keepNoteUpdate={this.updateKeep} keepNoteDiscard={this.discardThis} keep={this.state.keepData}/>
                <KeepList keep={this.state.keepData}  titleValue={this.state.titleValue} noteValue={this.state.noteValue} filterKeepData={this.filterThis} />
            </div>
        );
    }
});
var KeepList = React.createClass({
    blurFunction: function(event) {
        var hiddenFields = document.getElementsByClassName("text visibilityClass");
        for(var i=0; i<hiddenFields.length; i++) {
            var currentField = document.getElementsByClassName("text visibilityClass")[i].style.display="none";
        }
        document.getElementById("titleID").value = "";
        document.getElementById("noteID").value = "";
        document.getElementById("labelID").value = "";
        document.getElementById("keyID").value = "";
    },
    renderFromList: function(name, e) {
        document.getElementById("titleID").value = name.title;
        document.getElementById("noteID").value = name.text;
        document.getElementById("labelID").value = name.label;
        document.getElementById("keyID").value = name.key;
        document.getElementById("submitButtonID").style.display="none";
        document.getElementById("updateButtonID").style.display="block";
        document.getElementById("discardNoteID").style.display="block";
        document.getElementById("colorID").value = name.color;
        var colorValue = name.color;
        if(colorValue == "White") {
            document.getElementById("form-div").style.backgroundColor="white";
        }
        if(colorValue == "Red") {
            document.getElementById("form-div").style.backgroundColor="#F95C5C";
        }
        if(colorValue == "Blue") {
            document.getElementById("form-div").style.backgroundColor="#3FC3FF";
        }
        if(colorValue == "Yellow") {
            document.getElementById("form-div").style.backgroundColor="#FFFC46";
        }
        if(colorValue == "Orange") {
            document.getElementById("form-div").style.backgroundColor="#FF6D3F";
        }
        if(colorValue == "Green") {
            document.getElementById("form-div").style.backgroundColor="#96D841";
        }
        var hiddenFields = document.getElementsByClassName("text visibilityClass");
        for(var i=0; i<hiddenFields.length; i++) {
            var currentField = document.getElementsByClassName("text visibilityClass")[i].style.display="block";
        }
            var currentFilterValue = document.getElementById("filterID").value;
        // document.getElementById("labelID").value = currentFilterValue;
        if(currentFilterValue == "No Label") {
            document.getElementById("newLabelID").disabled = false;
        }
        else {
            document.getElementById("newLabelID").disabled = true;
        }
    },
    filterFunction: function() {
        var completeData = this.props.keep;
        var filteredData = [];
        var filterValue = document.getElementById("filterID").value;
        if(filterValue == "No Label") {
            for(var i=0; i< completeData.length; i++) {
                completeData[i].display = true;
            }
            filteredData = completeData;
        }
        else {
            for(var i=0; i< completeData.length; i++) {
                if(completeData[i].label == filterValue) {
                    completeData[i].display = true;
                }
                else {
                    completeData[i].display = false;
                }
            }
            filteredData = completeData;
        }
        this.props.filterKeepData(filteredData);

    },
    render: function() {
        var self = this;
        var data = [];
        this.props.keep.forEach(function(individualData) {
            var classNameVar = "";
            if(individualData.color == "White") {
                classNameVar = "note white";
            }
            if(individualData.color == "Red") {
                classNameVar = "note red";
            }
            if(individualData.color == "Blue") {
                classNameVar = "note blue";
            }
            if(individualData.color == "Yellow") {
                classNameVar = "note yellow";
            }
            if(individualData.color == "Orange") {
                classNameVar = "note orange";
            }
            if(individualData.color == "Green") {
                classNameVar = "note green";
            }
            if(individualData.display) {
                data.push(
                    <div className={classNameVar} key={individualData.key} onDoubleClick={self.renderFromList.bind(self, individualData)}>
                        <div className="title">
                            {individualData.title}
                            <span className="labelListClass" > {individualData.label}</span>
                        </div>
                        <p>
                            {individualData.text}
                        </p>
                    </div>
                );
            }
        });
        var keepData = this.props.keep;
        var labelArray = [];
        keepData.forEach(function(individualData) {
            labelArray.push(individualData.label);
        });
        var uniques = labelArray.unique();
        var selectOptions = [];
        selectOptions.push(<option key="blankKey" value="No Label">No Filtering</option>);
        for(var i=0; i<uniques.length; i++) {
            selectOptions.push(<option key={uniques[i]}> {uniques[i]} </option>);
        };
        return (
            <div   onClick={this.blurFunction}>
                {data}
                <select onChange={this.filterFunction} defaultValue="No Label" id="filterID" className="labelListClass" ref="filterRef">
                    {selectOptions}
                </select>
            </div>
        )
    }
});
var KeepInput = React.createClass({
    getInitialState: function() {
        return null;
    },
    keepNote: function(e) {
        e.preventDefault();
        if(this.refs.noteField.value) {
            var labelValue = this.refs.labelField.value
            if(this.refs.newLabel.value) {
                labelValue = this.refs.newLabel.value;
            }
            var newObject = {
                "label": labelValue,
                "title": this.refs.titleField.value || "No Title",
                "text": this.refs.noteField.value,
                "display": true,
                "color": this.refs.colorField.value
            };
            var oldKeep = this.props.keep;
            var maxKey = 0;
            for(var i=0; i<oldKeep.length; i++) {
                if(oldKeep[i].key > maxKey) {
                    maxKey = oldKeep[i].key;
                }
            }
            newObject.key = parseInt(maxKey) +1;
            oldKeep.push(newObject);
            var database = firebase.database();
            var starCountRef = firebase.database().ref('/'+ '"'+ newObject.key+'"').set(
                {
                    "label": labelValue,
                    "title": this.refs.titleField.value || "No Title",
                    "text": this.refs.noteField.value,
                    "display": true,
                    "color": this.refs.colorField.value
                }
            );
            this.props.keepNotePass(
                this.refs.titleField.value,
                this.refs.noteField.value,
                this.refs.labelField.value,
                oldKeep
            );
            this.refs.titleField.value = "";
            this.refs.noteField.value = "";
            this.refs.newLabel.value = "";
            this.refs.colorField.value = "White";
            var hiddenFields = document.getElementsByClassName("text visibilityClass");
            setTimeout(function() {
                for(var i=0; i<hiddenFields.length; i++) {
                    document.getElementsByClassName("text visibilityClass")[i].style.display="none";
                }
            },400);
            document.getElementById("form-div").style.backgroundColor="white";
        }
    },
    updateNote: function(e) {
        e.preventDefault();
        var keyValue = document.getElementById("keyID").value;
        if(this.refs.noteField.value) {
            var labelValue = this.refs.labelField.value
            if(this.refs.newLabel.value) {
                labelValue = this.refs.newLabel.value;
            }
            var newObject = {
                "label": labelValue,
                "title": this.refs.titleField.value || "No Title",
                "text": this.refs.noteField.value,
                "display": true,
                "color": this.refs.colorField.value
            };
            var database = firebase.database();
            var starCountRef = firebase.database().ref('/'+ '"'+ keyValue+'"').set(
                {
                    "label": labelValue,
                    "title": this.refs.titleField.value || "No Title",
                    "text": this.refs.noteField.value,
                    "display": true,
                    "color": this.refs.colorField.value
                }
            );
            this.refs.titleField.value = "";
            this.refs.noteField.value = "";
            this.refs.newLabel.value = "";
            this.refs.colorField.value = "White";
            var hiddenFields = document.getElementsByClassName("text visibilityClass");
            var oldKeep = this.props.keep;
            for(var i=0; i< oldKeep.length; i++) {
                if(oldKeep[i].key == keyValue) {
                    newObject.key = parseInt(keyValue);
                    oldKeep[i] = newObject;
                }
            }
            this.props.keepNoteUpdate(
                this.refs.titleField.value,
                this.refs.noteField.value,
                this.refs.labelField.value,
                oldKeep
            );
            document.getElementById("submitButtonID").style.display="block";
            document.getElementById("updateButtonID").style.display="none";
            document.getElementById("discardNoteID").style.display="none";
            setTimeout(function() {
            for(var i=0; i<hiddenFields.length; i++) {
                var currentField = document.getElementsByClassName("text visibilityClass")[i].style.display="none";
            }
        },400);
        document.getElementById("form-div").style.backgroundColor="white";
        }
    },
    discardNote: function(e) {
        e.preventDefault();
        var keyValue = document.getElementById("keyID").value;
            this.refs.titleField.value = "";
            this.refs.noteField.value = "";
            this.refs.newLabel.value = "";
            var hiddenFields = document.getElementsByClassName("text visibilityClass");
            var oldKeep = this.props.keep;
            for(var i=0; i< oldKeep.length; i++) {
                if(oldKeep[i].key == keyValue) {
                    oldKeep.splice(i,1);
                }
            }
            this.props.keepNoteDiscard(oldKeep);
            document.getElementById("submitButtonID").style.display="block";
            document.getElementById("updateButtonID").style.display="none";
            document.getElementById("discardNoteID").style.display="none";
            var database = firebase.database();
            var starCountRef = firebase.database().ref('/'+ '"'+ keyValue+'"').remove();

            setTimeout(function() {
            for(var i=0; i<hiddenFields.length; i++) {
                var currentField = document.getElementsByClassName("text visibilityClass")[i].style.display="none";
            }
        },400);
        document.getElementById("form-div").style.backgroundColor="white";
    },
    cssChangesFunction: function() {
        var hiddenFields = document.getElementsByClassName("text visibilityClass");
        for(var i=0; i<hiddenFields.length; i++) {
            var currentField = document.getElementsByClassName("text visibilityClass")[i].style.display="block";
        }
    },
    colorChangeListener: function() {
        var existingClassName = document.getElementById("form-div").className;
        var colorValue = document.getElementById("colorID").value;
        if(colorValue == "White") {
            document.getElementById("form-div").style.backgroundColor="white";
        }
        if(colorValue == "Red") {
            document.getElementById("form-div").style.backgroundColor="#F95C5C";
        }
        if(colorValue == "Blue") {
            document.getElementById("form-div").style.backgroundColor="#3FC3FF";
        }
        if(colorValue == "Yellow") {
            document.getElementById("form-div").style.backgroundColor="#FFFC46";
        }
        if(colorValue == "Orange") {
            document.getElementById("form-div").style.backgroundColor="#FF6D3F";
        }
        if(colorValue == "Green") {
            document.getElementById("form-div").style.backgroundColor="#96D841";
        }
    },
    render: function() {
        var keepData = this.props.keep;
        var labelArray = [];
        keepData.forEach(function(individualData) {
            labelArray.push(individualData.label);
        });
        var uniques = labelArray.unique();
        var selectOptions = [];
        selectOptions.push(<option key="blankKey" value="No Label" disabled>Choose a label</option>);
        for(var i=0; i<uniques.length; i++) {
            selectOptions.push(<option key={uniques[i]}> {uniques[i]} </option>);
        }
        return (
            <div id="form-div"  onClick={this.cssChangesFunction}>
                <form className="form" id="form1">
                    <p className="name">
                        <input className="feedback-input titleClass" id="titleID" ref="titleField" type="text" placeholder="Title" />
                    </p>
                    <input type="hidden" id="keyID" ref="keyField" />
                    <p className="text visibilityClass">
                        <textarea className="feedback-input" id="noteID" ref="noteField" placeholder="Note" />
                    </p>
                    <p className="text visibilityClass">
                    <select defaultValue="No Label" id="labelID" className="feedback-input lessWidth"  ref="labelField">
                        {selectOptions}
                    </select>&nbsp;OR&nbsp;
                    <input className="feedback-input lessWidth rightFloat" id="newLabelID" type="text" ref="newLabel" placeholder="Add A New Label" />
                    </p>
                    <p className="text visibilityClass">
                    <select onChange={this.colorChangeListener} defaultValue="White" id="colorID" className="feedback-input"  ref="colorField">
                        <option value="White">White</option>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Orange">Orange</option>
                        <option value="Green">Green</option>
                    </select>
                    </p>
                    <p className="text visibilityClass">
                    <input className="feedback-input submitButton"  onClick={this.keepNote} id="submitButtonID" type="submit" value="KEEP" />
                    <input className="feedback-input submitButton visibilityClass" onClick={this.updateNote} id="updateButtonID" type="button" value="DONE" /><br />
                    <input className="feedback-input submitButton visibilityClass" onClick={this.discardNote} id="discardNoteID" type="button" value="DISCARD" />
                    </p>
                </form>
            </div>
        )
    }
});
ReactDOM.render(<OuterContainer url='sample.js' />, document.getElementById("content"));
