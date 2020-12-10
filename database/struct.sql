create table agendar_envio(
	agenda_id bigserial not null,
	agenda_horario timestamp not null,
	agenda_situacao char(1) not null default 'N', -- [E]: enviado, [N]: não enviado
	agenda_sessao varchar(255),
	cli_cpf varchar(11)not null,
	constraint pk_agenda primary key(agenda_id),
	constraint fk_agenda_cliente foreign key(cli_cpf)references cliente(cli_cpf)on delete cascade
																					on update cascade
);