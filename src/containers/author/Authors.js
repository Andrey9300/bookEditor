import { connect } from 'react-redux';
import Authors from '../../components/author/Authors';

const mapStateToProps = state => ({
    authors: state.authors ? state.authors.authors : []
});

export default connect(
    mapStateToProps
)(Authors)