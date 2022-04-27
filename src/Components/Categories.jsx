import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = ({
      categoriesList: [],
    });
  }

  async componentDidMount() {
    const categoriesList = await getCategories();
    this.setState({
      categoriesList,
    });
  }

  render() {
    const { categoriesList } = this.state;
    const { handleClick } = this.props;
    return (
      <aside>
        <ul>
          Categorias:
          {
            categoriesList.map(({ id, name }) => (
              <li key={ id }>
                <button
                  name="category"
                  value={ id }
                  onClick={ handleClick }
                  data-testid="category"
                  type="button"
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
