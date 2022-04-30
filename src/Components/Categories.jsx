import React from 'react';
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
                  type="button"
                  data-testid="category"
                >
                  {name}
                </button>
              </li>
            ))
          }
        </ul>
      </aside>
    );
  }
}

export default Categories;
