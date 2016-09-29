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
var existingData = [
    {
        'key': 0,
        'label': 'OTHER',
        'title': 'REAL MADRID',
        'text': 'HALA MADRID'
    },
    {
        'key': 1,
        'label': 'FOOTBALL',
        'title': 'MAN UNITED',
        'text': 'GLORY GLORY MAN UNITED'
    },
    {
        'key': 2,
        'label': 'FOOTBALL',
        'title': 'LIVERPOOL',
        'text': 'YOU WILL NEVER WALK ALONE'
    }
];
var OuterContainer = React.createClass({
    getInitialState: function() {
        return {
            labelValue: '',
            titleValue: '',
            noteValue: '',
            keepData: existingData
        }
    },
    newKeep: function(titleValueNew, noteValueNew, newTitle, newKeep) {
        this.setState( {
            labelValue: '',
            titleValue: '',
            noteValue: '',
            keepData: newKeep
        })
    },
    updateKeep: function(titleValueNew, noteValueNew, newTitle, newKeep) {
        this.setState( {
            labelValue: '',
            titleValue: '',
            noteValue: '',
            keepData: newKeep
        })
    },
    discardThis: function(newKeep) {
        this.setState( {
            labelValue: '',
            titleValue: '',
            noteValue: '',
            keepData: newKeep
        })
    },
    render: function() {
        return (
            <div className="mainDiv">
                <KeepInput keepNotePass={this.newKeep} keepNoteUpdate={this.updateKeep} keepNoteDiscard={this.discardThis} keep={this.state.keepData}/>
                <KeepList keep={this.state.keepData}  titleValue={this.state.titleValue} noteValue={this.state.noteValue} />
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
        document.getElementById("titleID").value = '';
        document.getElementById("noteID").value = '';
        document.getElementById("labelID").value = '';
        document.getElementById("keyID").value = '';
    },
    renderFromList: function(name, e) {
        document.getElementById("titleID").value = name.title;
        document.getElementById("noteID").value = name.text;
        document.getElementById("labelID").value = name.label;
        document.getElementById("keyID").value = name.key;
        document.getElementById("submitButtonID").style.display="none";
        document.getElementById("updateButtonID").style.display="block";
        document.getElementById("discardNoteID").style.display="block";
        var hiddenFields = document.getElementsByClassName("text visibilityClass");
        for(var i=0; i<hiddenFields.length; i++) {
            var currentField = document.getElementsByClassName("text visibilityClass")[i].style.display="block";
        }
    },
    render: function() {
        var self = this;
        var data = [];
        this.props.keep.forEach(function(individualData) {
            var classNameVar = '';
            if(individualData.key % 5 == 0) {
                classNameVar = "note red";
            }
            else if(individualData.key % 5 == 1) {
                classNameVar = "note blue";
            }
            else if(individualData.key % 5 == 2) {
                classNameVar = "note yellow";
            }
            else if(individualData.key % 5 == 3) {
                classNameVar = "note orange";
            }
            else if(individualData.key % 5 == 4) {
                classNameVar = "note green";
            }
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
        })
        return (
            <div   onClick={this.blurFunction}>
                {data}
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
                'label': labelValue,
                'title': this.refs.titleField.value || 'No Title',
                'text': this.refs.noteField.value
            };
            this.refs.titleField.value = '';
            this.refs.noteField.value = '';
            this.refs.newLabel.value = '';
            var hiddenFields = document.getElementsByClassName("text visibilityClass");
            for(var i=0; i<hiddenFields.length; i++) {
                var currentField = document.getElementsByClassName("text visibilityClass")[i].style.display="none";
            }
            var oldKeep = this.props.keep;
            var maxKey = 0;
            for(var i=0; i<oldKeep.length; i++) {
                if(oldKeep[i].key > maxKey) {
                    maxKey = oldKeep[i].key;
                }
            }
            newObject.key = parseInt(maxKey) +1;
            oldKeep.push(newObject);
            this.props.keepNotePass(
                this.refs.titleField.value,
                this.refs.noteField.value,
                this.refs.labelField.value,
                oldKeep
            );
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
                'label': labelValue,
                'title': this.refs.titleField.value || 'No Title',
                'text': this.refs.noteField.value
            };
            this.refs.titleField.value = '';
            this.refs.noteField.value = '';
            this.refs.newLabel.value = '';
            var hiddenFields = document.getElementsByClassName("text visibilityClass");
            var oldKeep = this.props.keep;
            oldKeep[keyValue] = newObject;
            oldKeep[keyValue].key = keyValue;
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
        }
    },
    discardNote: function(e) {
        e.preventDefault();
        var keyValue = document.getElementById("keyID").value;
            this.refs.titleField.value = '';
            this.refs.noteField.value = '';
            this.refs.newLabel.value = '';
            var hiddenFields = document.getElementsByClassName("text visibilityClass");
            var oldKeep = this.props.keep;
            console.log(oldKeep);
            for(var i=0; i< oldKeep.length; i++) {
                if(oldKeep[i].key == keyValue) {
                    oldKeep.splice(i,1);
                }
            }
            this.props.keepNoteDiscard(oldKeep);
            document.getElementById("submitButtonID").style.display="block";
            document.getElementById("updateButtonID").style.display="none";
            document.getElementById("discardNoteID").style.display="none";
            setTimeout(function() {
            for(var i=0; i<hiddenFields.length; i++) {
                var currentField = document.getElementsByClassName("text visibilityClass")[i].style.display="none";
            }
        },400);
    },
    cssChangesFunction: function() {
        var hiddenFields = document.getElementsByClassName("text visibilityClass");
        for(var i=0; i<hiddenFields.length; i++) {
            var currentField = document.getElementsByClassName("text visibilityClass")[i].style.display="block";
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
                    <input className="feedback-input submitButton"  onClick={this.keepNote} id="submitButtonID" type="submit" value="KEEP" />
                    <input className="feedback-input submitButton visibilityClass" onClick={this.updateNote} id="updateButtonID" type="button" value="DONE" /><br />
                    <input className="feedback-input submitButton visibilityClass" onClick={this.discardNote} id="discardNoteID" type="button" value="DISCARD THIS NOTE" />
                    </p>
                </form>
            </div>
        )
    }
});
ReactDOM.render(<OuterContainer keep={ existingData } />, document.getElementById('content'));
