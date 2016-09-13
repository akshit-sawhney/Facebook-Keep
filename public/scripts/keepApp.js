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
            <div>
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
            data.push(
                <tr key={individualData.key}>
                    <td>
                        {individualData.label}
                    </td>
                    <td>
                        {individualData.title}
                    </td>
                    <td>
                        {individualData.text}
                    </td>
                </tr>
            );
        })
        return (
            <table>
                <thead>
                    <tr>
                        <th>LABEL</th>
                        <th>TITLE</th>
                        <th>TEXT</th>
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </table>
        )
    }
});
var KeepInput = React.createClass({
    getInitialState: function() {
        return null;
    },
    keepNote: function(e) {
        e.preventDefault();
        var newObject = {
            'label': this.refs.labelField.value,
            'title': this.refs.titleField.value,
            'text': this.refs.noteField.value
        };
        this.refs.titleField.value = '';
        this.refs.noteField.value = '';
        var oldKeep = this.props.keep;
        var maxKey = 0;
        for(var i=0; i<oldKeep.length; i++) {
            if(oldKeep[i].key > maxKey) {
                maxKey = oldKeep[i].key;
            }
        }
        newObject.key = parseInt(maxKey) +1;
        oldKeep.push(newObject);
        console.log(oldKeep);
        this.props.keepNotePass(
            this.refs.titleField.value,
            this.refs.noteField.value,
            this.refs.labelField.value,
            oldKeep
        );
    },
    render: function() {
        var keepData = this.props.keep;
        var labelArray = [];
        keepData.forEach(function(individualData) {
            labelArray.push(individualData.label);
        });
        var uniques = labelArray.unique();
        var selectOptions = [];
        for(var i=0; i<uniques.length; i++) {
            selectOptions.push(<option key={uniques[i]}> {uniques[i]} </option>);
        }
        return (
            <form onSubmit={this.keepNote}>
                <input ref="titleField" type="text" placeholder="Title" />
                <textarea ref="noteField" rows="4" cols="50" placeholder="Note" />
                <select ref="labelField">
                    {selectOptions}
                </select>
                <input type="submit" value="Add" />
            </form>
        )
    }
});
ReactDOM.render(<OuterContainer keep={ existingData } />, document.getElementById('content'));
