// Import modules
import React from 'react';
import { connect } from 'react-redux';

// Import Redux action & thunk creators
import { getProduct } from '../store/singleProduct';

// Define component
class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  render() {
    const { product } = this.props;

    if (product.id !== this.props.match.params.id) return <div>Loading...</div>;

    return (
      <div>
        <img src={product.imageUrl} />
        <p>{product.name}</p>
        <p>${product.price}</p>
        <p>Description: {product.description}</p>
      </div>
    );
  }
}

// Connect Redux store's state to props
const mapState = (state) => {
  return {
    product: state.singleProduct,
  };
};

// Connect Redux store's action/thunk creators to props
const mapDispatch = (dispatch) => {
  return {
    getProduct: (productId) => dispatch(getProduct(productId)),
  };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(SingleProduct);