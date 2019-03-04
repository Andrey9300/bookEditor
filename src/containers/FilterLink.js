import { connect } from 'react-redux';
import { setSortingFilter } from '../actions/book';
import Link from '../components/filters/Link';

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(setSortingFilter(ownProps.filter))
});

export default connect(
    null,
    mapDispatchToProps
)(Link)