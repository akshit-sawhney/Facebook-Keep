var existingData = [
    {
        'label': 'FOOTBALL',
        'title': 'REAL MADRID',
        'text': 'HALA MADRID'
    },
    {
        'label': 'FOOTBALL',
        'title': 'MAN UNITED',
        'text': 'GLORY GLORY MAN UNITED'
    },
    {
        'label': 'FOOTBALL',
        'title': 'LIVERPOOL',
        'text': 'YOU WILL NEVER WALK ALONE'
    }
];
var OuterContainer = React.createClass({
    getInitialState: function() {
        return {
            titleValue: '',
            noteValue: '',
            keepData: existingData
        }
    },
    newKeep: function(titleValueNew, noteValueNew, newKeep) {
        this.setState( {
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
                <tr key={individualData.title}>
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
            'label': 'FOOTBALL',
            'title': this.refs.titleField.value,
            'text': this.refs.noteField.value
        };
        this.refs.titleField.value = '';
        this.refs.noteField.value = '';
        var oldKeep = this.props.keep;
        oldKeep.push(newObject);
        this.props.keepNotePass(
            this.refs.titleField.value,
            this.refs.noteField.value,
            oldKeep
        );
    },
    render: function() {
        return (
            <form onSubmit={this.keepNote}>
                <input ref="titleField" type="text" placeholder="Title" />
                <textarea ref="noteField" rows="4" cols="50" placeholder="Note" />
                <input type="submit" value="Add" />
            </form>
        )
    }
});
ReactDOM.render(<OuterContainer keep={ existingData } />, document.getElementById('content'));
