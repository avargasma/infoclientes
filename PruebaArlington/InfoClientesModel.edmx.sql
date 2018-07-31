
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 07/31/2018 09:28:31
-- Generated from EDMX file: F:\MvcAngularJS\PruebaArlington\InfoClientesModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [INFOCLIENTES];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_CuposCliente_Clientes]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CuposCliente] DROP CONSTRAINT [FK_CuposCliente_Clientes];
GO
IF OBJECT_ID(N'[dbo].[FK_Visitas_Clientes]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Visitas] DROP CONSTRAINT [FK_Visitas_Clientes];
GO
IF OBJECT_ID(N'[dbo].[FK_Visitas_Vendedor]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Visitas] DROP CONSTRAINT [FK_Visitas_Vendedor];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Clientes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Clientes];
GO
IF OBJECT_ID(N'[dbo].[CuposCliente]', 'U') IS NOT NULL
    DROP TABLE [dbo].[CuposCliente];
GO
IF OBJECT_ID(N'[dbo].[Departamento]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Departamento];
GO
IF OBJECT_ID(N'[dbo].[Municipio]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Municipio];
GO
IF OBJECT_ID(N'[dbo].[Pais]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Pais];
GO
IF OBJECT_ID(N'[dbo].[sysdiagrams]', 'U') IS NOT NULL
    DROP TABLE [dbo].[sysdiagrams];
GO
IF OBJECT_ID(N'[dbo].[Vendedor]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Vendedor];
GO
IF OBJECT_ID(N'[dbo].[Visitas]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Visitas];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Departamento'
CREATE TABLE [dbo].[Departamento] (
    [DpPais] varchar(3)  NOT NULL,
    [DpCodDpto] varchar(3)  NOT NULL,
    [DpNomDpto] varchar(100)  NOT NULL
);
GO

-- Creating table 'Municipio'
CREATE TABLE [dbo].[Municipio] (
    [MnDepartamento] varchar(3)  NOT NULL,
    [MnIdMunicipio] varchar(6)  NOT NULL,
    [MnCodMunicipio] varchar(3)  NOT NULL,
    [MnNombreMunicipio] varchar(50)  NOT NULL
);
GO

-- Creating table 'Pais'
CREATE TABLE [dbo].[Pais] (
    [PsCodPais] varchar(3)  NOT NULL,
    [PsNomPais] varchar(100)  NOT NULL,
    [PsCodIso] varchar(3)  NOT NULL
);
GO

-- Creating table 'sysdiagrams'
CREATE TABLE [dbo].[sysdiagrams] (
    [name] nvarchar(128)  NOT NULL,
    [principal_id] int  NOT NULL,
    [diagram_id] int IDENTITY(1,1) NOT NULL,
    [version] int  NULL,
    [definition] varbinary(max)  NULL
);
GO

-- Creating table 'Vendedor'
CREATE TABLE [dbo].[Vendedor] (
    [VdDocumento] bigint  NOT NULL,
    [VdNombresApe] varchar(200)  NOT NULL,
    [VdFechaCrea] datetime  NOT NULL,
    [VdDireccion] varchar(500)  NOT NULL,
    [VdTelefono] varchar(20)  NOT NULL
);
GO

-- Creating table 'Clientes'
CREATE TABLE [dbo].[Clientes] (
    [ClNIt] varchar(900)  NOT NULL,
    [ClNombresApe] varchar(300)  NOT NULL,
    [ClDireccion] varchar(500)  NOT NULL,
    [ClTel] varchar(15)  NOT NULL,
    [MnIdMunicipio] varchar(6)  NOT NULL,
    [ClCupo] decimal(18,4)  NOT NULL,
    [ClSaldoCupo] decimal(18,4)  NOT NULL CONSTRAINT [DF_Clientes_ClSaldoCupo]  DEFAULT ((0)),
    [ClPorceVisitas] decimal(5,2)  NOT NULL CONSTRAINT [DF_Clientes_ClPorceVisitas]  DEFAULT ((0))
);
GO

-- Creating table 'CuposCliente'
CREATE TABLE [dbo].[CuposCliente] (
    [CcSec] int IDENTITY(1,1) NOT NULL,
    [CcClNit] varchar(900)  NOT NULL,
    [CcValor] decimal(18,4)  NOT NULL,
    [CcFecha] datetime  NOT NULL
);
GO

-- Creating table 'Visitas'
CREATE TABLE [dbo].[Visitas] (
    [VsSec] int IDENTITY(1,1) NOT NULL,
    [VsFeha] datetime  NOT NULL,
    [VsValorNeto] decimal(18,4)  NOT NULL,
    [VsValorVisita] decimal(18,4)  NOT NULL,
    [VsObservacion] varchar(max)  NOT NULL,
    [ClNit] varchar(900)  NOT NULL,
    [VdDocumento] bigint  NOT NULL,
    [VsIdMuni] varchar(6)  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [DpCodDpto] in table 'Departamento'
ALTER TABLE [dbo].[Departamento]
ADD CONSTRAINT [PK_Departamento]
    PRIMARY KEY CLUSTERED ([DpCodDpto] ASC);
GO

-- Creating primary key on [MnIdMunicipio] in table 'Municipio'
ALTER TABLE [dbo].[Municipio]
ADD CONSTRAINT [PK_Municipio]
    PRIMARY KEY CLUSTERED ([MnIdMunicipio] ASC);
GO

-- Creating primary key on [PsCodPais] in table 'Pais'
ALTER TABLE [dbo].[Pais]
ADD CONSTRAINT [PK_Pais]
    PRIMARY KEY CLUSTERED ([PsCodPais] ASC);
GO

-- Creating primary key on [diagram_id] in table 'sysdiagrams'
ALTER TABLE [dbo].[sysdiagrams]
ADD CONSTRAINT [PK_sysdiagrams]
    PRIMARY KEY CLUSTERED ([diagram_id] ASC);
GO

-- Creating primary key on [VdDocumento] in table 'Vendedor'
ALTER TABLE [dbo].[Vendedor]
ADD CONSTRAINT [PK_Vendedor]
    PRIMARY KEY CLUSTERED ([VdDocumento] ASC);
GO

-- Creating primary key on [ClNIt] in table 'Clientes'
ALTER TABLE [dbo].[Clientes]
ADD CONSTRAINT [PK_Clientes]
    PRIMARY KEY CLUSTERED ([ClNIt] ASC);
GO

-- Creating primary key on [CcSec] in table 'CuposCliente'
ALTER TABLE [dbo].[CuposCliente]
ADD CONSTRAINT [PK_CuposCliente]
    PRIMARY KEY CLUSTERED ([CcSec] ASC);
GO

-- Creating primary key on [VsSec] in table 'Visitas'
ALTER TABLE [dbo].[Visitas]
ADD CONSTRAINT [PK_Visitas]
    PRIMARY KEY CLUSTERED ([VsSec] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [CcClNit] in table 'CuposCliente'
ALTER TABLE [dbo].[CuposCliente]
ADD CONSTRAINT [FK_CuposCliente_Clientes]
    FOREIGN KEY ([CcClNit])
    REFERENCES [dbo].[Clientes]
        ([ClNIt])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CuposCliente_Clientes'
CREATE INDEX [IX_FK_CuposCliente_Clientes]
ON [dbo].[CuposCliente]
    ([CcClNit]);
GO

-- Creating foreign key on [ClNit] in table 'Visitas'
ALTER TABLE [dbo].[Visitas]
ADD CONSTRAINT [FK_Visitas_Clientes]
    FOREIGN KEY ([ClNit])
    REFERENCES [dbo].[Clientes]
        ([ClNIt])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Visitas_Clientes'
CREATE INDEX [IX_FK_Visitas_Clientes]
ON [dbo].[Visitas]
    ([ClNit]);
GO

-- Creating foreign key on [VdDocumento] in table 'Visitas'
ALTER TABLE [dbo].[Visitas]
ADD CONSTRAINT [FK_Visitas_Vendedor]
    FOREIGN KEY ([VdDocumento])
    REFERENCES [dbo].[Vendedor]
        ([VdDocumento])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Visitas_Vendedor'
CREATE INDEX [IX_FK_Visitas_Vendedor]
ON [dbo].[Visitas]
    ([VdDocumento]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------