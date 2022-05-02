import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      listCategories: [],
    };
  }

  async componentDidMount() {
    const listCategories = await getCategories();
    this.setState({
      listCategories,
    });
  }

  render() {
    const { listCategories } = this.state;
    const { handleClick } = this.props;

    return (
      <aside>
        <ul>
          Categorias:
          {
            listCategories.map(({ id, name }) => (
              <li key={ id }>
                <button
                  name="category"
                  value={ id }
                  onClick={ handleClick }
                  type="button"
                  data-testid="category"
                >
                  { name }
                </button>
              </li>
            ))
          }
        </ul>
      </aside>
    );
  }
}

Categories.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Categories;
