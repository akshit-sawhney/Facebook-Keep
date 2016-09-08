var FilterableProductTable = React.createClass({
    getInitialState: function() {
        return {
            filterText: '',
            inStock: false
        }
    },
    myFirstParentFunction: function(filterTextInput, checkboxInput) {
        this.setState(
            {
                filterText: filterTextInput,
                inStock: checkboxInput
            }
        )
    },
    render: function() {
        return (
            <div>
            <SearchBar filterText={this.state.filterText}
            inStock={this.state.inStock} changeDetection={this.myFirstParentFunction}/>
            <ProductTable products={this.props.product} filterText={this.state.filterText}
            inStock={this.state.inStock} />
            </div>
        )
    }
});
var SearchBar = React.createClass({
    myFirstFunction: function() {
        this.props.changeDetection(
            this.refs.myFirstRef.value,
            this.refs.mySecondRef.checked
        );
    },
    render: function() {
        return (
            <form>
            <input type="text" placeholder="Search Here" ref="myFirstRef" value={this.props.filterText} onChange={this.myFirstFunction}/>
            <div></div>
            <input type="checkbox" checked={this.props.inStock} ref="mySecondRef" onChange={this.myFirstFunction}/>
            </form>
        )
    }
});
var ProductTable = React.createClass({
    render: function() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStock)) {
              return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        }.bind(this));
        return (
            <div>
            {rows}
            </div>
        );
    }
});
var ProductCategoryRow = React.createClass({
    render: function() {
        return (
            <div>{this.props.category}</div>
        )
    }
});
var ProductRow = React.createClass({
    render: function() {
        var name = this.props.product.stocked ? this.props.product.name : <span style={{color: 'red'}}>{this.props.product.name}</span>
        var price = this.props.product.stocked ? this.props.product.price : <span style={{color: 'red'}}>{this.props.product.price}</span>
        return (
            <div>
            {name}
            {price}
            </div>
        )
    }
});
var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
ReactDOM.render(<FilterableProductTable product={ PRODUCTS }/>, document.getElementById('content'));
