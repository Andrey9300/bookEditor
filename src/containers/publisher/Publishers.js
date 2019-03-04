import { connect } from 'react-redux';
import Publishers from '../../components/publisher/Publishers';

const mapStateToProps = state => ({
    publishers: state.publishers ? state.publishers.publishers : []
});

export default connect(
    mapStateToProps
)(Publishers)