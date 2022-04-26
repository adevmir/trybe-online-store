import React from 'react';
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
    return (
      <aside>
        <ul>
          Categorias:
          {
            categoriesList.map(({ id, name }) => (
              <li key={ id }>
                <button data-testid="category" type="button">{ name }</button>
              </li>
            ))
          }
        </ul>
      </aside>
    );
  }
}

export default Categories;
