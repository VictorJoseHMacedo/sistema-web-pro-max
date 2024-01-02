import React from "react";

export default function UserForm({ onSubmit, isLoading, user }) {
  return (
    <form className="max-w-md" onSubmit={onSubmit}>
      <div className="flex gap-4">
        <div className="form-group">
          <label htmlFor="firstName">Nome</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            defaultValue={user?.firstName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Sobrenome</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
            defaultValue={user?.lastName}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          defaultValue={user?.email}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">{user ? "Nova Senha" : "Senha"}</label>
        <input
          type="password"
          name="password"
          id="password"
          required={user ? undefined : true}
          autoComplete="new-password"
        />
      </div>

      <div className="flex gap-4">
        <div className="form-group">
          <label htmlFor="birthday">Data de Nascimento</label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            required
            defaultValue={user && user.birthday ? user.birthday.split("T")[0] : ''}
          />
        </div>

        <div className="form-group">
          <label>Gênero</label>
          <div>
            <label htmlFor="male">
              M{" "}
              <input
                type="radio"
                value="M"
                name="gender"
                id="male"
                required
                defaultChecked={user?.gender === "M"}
              />
            </label>

            <label htmlFor="female" className="mx-4">
              F{" "}
              <input
                type="radio"
                value="F"
                name="gender"
                id="female"
                required
                defaultChecked={user?.gender === "F"}
              />
            </label>

            <label htmlFor="anonymous">
              X{" "}
              <input
                type="radio"
                value="X"
                name="gender"
                id="anonymous"
                required
                defaultChecked={user?.gender === "X"}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="form-group">
          <label htmlFor="phone">Telefone</label>
          <input
            type="number"
            name="phone"
            id="phone"
            required
            defaultValue={user?.phone}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Função</label>
          <select name="role" id="role" className="w-full cursor-pointer" defaultValue={user?.role}>
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
      </div>

      <button
        disabled={isLoading}
        className="bg-sky-500 hover:bg-sky-600 transition-all p-2 text-white disabled:bg-zinc-500 w-full"
      >
        {user ? "Salvar Alterações" : "Criar Usuário"}
      </button>
    </form>
  );
}
