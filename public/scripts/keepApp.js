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
    render: function() {
        return (
            <div className="mainDiv">
                <KeepInput keepNotePass={this.newKeep} keep={this.state.keepData}/>
                <KeepList keep={this.state.keepData}  titleValue={this.state.titleValue} noteValue={this.state.noteValue} />
            </div>
        );
    }
});
var KeepList = React.createClass({
    render: function() {
        var data = [];
        this.props.keep.forEach(function(individualData) {
            console.log(individualData.key);
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
                <div className={classNameVar} key={individualData.key}>
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
            <div>
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
            <div id="form-div">
                <form className="form" id="form1" onSubmit={this.keepNote}>
                    <p className="name">
                        <input className="feedback-input" ref="titleField" type="text" placeholder="Title" />
                    </p>
                    <p className="text">
                        <textarea className="feedback-input"  ref="noteField" rows="4" cols="50" placeholder="Note" />
                    </p>
                    <p className="text">
                    <select defaultValue="No Label" className="feedback-input lessWidth"  ref="labelField">
                        {selectOptions}
                    </select>&nbsp;OR&nbsp;
                    <input className="feedback-input lessWidth rightFloat"  type="text" ref="newLabel" placeholder="Add A New Label" />
                    </p>
                    <p className="text">
                    <input className="feedback-input"  type="submit" value="KEEP" />
                    </p>
                </form>
            </div>
        )
    }
});
ReactDOM.render(<OuterContainer keep={ existingData } />, document.getElementById('content'));
