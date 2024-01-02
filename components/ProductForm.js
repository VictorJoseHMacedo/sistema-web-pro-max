"use client";

export default function ProductForm({ onSubmit, isLoading, product }) {
  return (
    <form className="max-w-md" onSubmit={onSubmit}>
      <div className="flex gap-4">
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            defaultValue={product?.name}
          />
        </div>

        <div className="form-group">
          <label htmlFor="brand">Marca/Fabricante</label>
          <input
            type="text"
            name="brand"
            id="brand"
            required
            defaultValue={product?.brand}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select
            name="category"
            id="category"
            className="w-full cursor-pointer"
            defaultValue={product?.category}
          >
            <option value="Eletrônicos">Eletrônicos</option>
            <option value="Vestuário e Moda">Vestuário e Moda</option>
            <option value="Casa e Decoração">Casa e Decoração</option>
            <option value="Alimentos e Bebidas">Alimentos e Bebidas</option>
            <option value="Saúde e Beleza">Saúde e Beleza</option>
            <option value="Esportes e Lazer">Esportes e Lazer</option>
            <option value="Automotivo">Automotivo</option>
            <option value="Brinquedos e Jogos">Brinquedos e Jogos</option>
            <option value="Livros e Mídia">Livros e Mídia</option>
            <option value="Ferramentas e Equipamentos">
              Ferramentas e Equipamentos
            </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantidade</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            defaultValue={product?.quantity}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="form-group">
          <label htmlFor="cost">Custo de Unid(R$)</label>
          <input
            type="number"
            name="cost"
            id="cost"
            required
            defaultValue={product?.cost}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Preço de Venda(R$)</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            defaultValue={product?.price}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea
          name="description"
          id="description"
          rows="5"
          className="w-full"
          defaultValue={product?.description}
        ></textarea>
      </div>

      <button
        disabled={isLoading}
        className="bg-sky-500 hover:bg-sky-600 transition-all p-2 text-white disabled:bg-zinc-500 w-full"
      >
        {product ? "Salvar Alterações" : "Criar Produto"}
      </button>
    </form>
  );
}
