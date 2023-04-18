-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-04-2023 a las 01:17:42
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `elcomerciantejs`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comanda`
--

CREATE TABLE `comanda` (
  `id` int(255) NOT NULL,
  `mesa` int(2) DEFAULT NULL,
  `total` int(5) DEFAULT NULL,
  `estado` int(1) DEFAULT NULL,
  `idUsuario` int(255) NOT NULL,
  `fecha` timestamp NULL DEFAULT current_timestamp(),
  `forma_pago` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comanda`
--

INSERT INTO `comanda` (`id`, `mesa`, `total`, `estado`, `idUsuario`, `fecha`, `forma_pago`) VALUES
(1, 0, 280, 1, 1, '2023-01-13 01:12:23', 'Debito'),
(2, 1, 185, 0, 1, '2023-01-13 01:12:23', 'Efectivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comanda-(envase-helado)`
--

CREATE TABLE `comanda-(envase-helado)` (
  `id` int(11) NOT NULL,
  `idComanda` int(11) NOT NULL,
  `idEnvaseHelado` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `combo`
--

CREATE TABLE `combo` (
  `id` int(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` int(5) DEFAULT NULL,
  `activo` bit(1) NOT NULL DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `combo`
--

INSERT INTO `combo` (`id`, `nombre`, `descripcion`, `precio`, `activo`) VALUES
(1, 'Combo capuccino y envase grande', 'un café capuccino y un envase grande de helado :D', 185, b'1'),
(2, 'Combo de verano', 'Unas paletas de helado y un buen postre fresco para este verano:D', 125, b'1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `combo_comanda`
--

CREATE TABLE `combo_comanda` (
  `idCombo` int(255) NOT NULL,
  `numComanda` int(255) NOT NULL,
  `cantidad` int(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `combo_envase`
--

CREATE TABLE `combo_envase` (
  `idCombo` int(255) NOT NULL,
  `idEnvase` int(255) NOT NULL,
  `cantidad` int(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `combo_producto`
--

CREATE TABLE `combo_producto` (
  `idCombo` int(255) NOT NULL,
  `idProducto` int(255) NOT NULL,
  `cantidad` int(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envase`
--

CREATE TABLE `envase` (
  `id` int(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `capacidad` int(255) DEFAULT NULL,
  `precio` int(5) DEFAULT NULL,
  `activo` bit(1) NOT NULL DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `envase`
--

INSERT INTO `envase` (`id`, `nombre`, `descripcion`, `capacidad`, `precio`, `activo`) VALUES
(1, 'Envase grande', 'El más grande envase para el más grande disfrute', 6, 200, b'1'),
(2, 'Envase mediano', 'Envase con una cantidad moderada de helado para disfrutar con un amigo', 4, 160, b'1'),
(3, 'Envase hiper grande', 'un envase re grande', 7, 200, b'1'),
(4, 'ewe', 'owo', 1, 33, b'1'),
(5, 'awa', 'owo', 1, 33, b'1'),
(7, 'kwk', 'owo', 1, 33, b'1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envase-helado`
--

CREATE TABLE `envase-helado` (
  `heladoId` int(11) NOT NULL,
  `envaseId` int(11) NOT NULL,
  `cantidadHelado` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `helado`
--

CREATE TABLE `helado` (
  `id` int(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `activo` bit(1) NOT NULL DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `helado`
--

INSERT INTO `helado` (`id`, `nombre`, `descripcion`, `activo`) VALUES
(1, 'Dulce de leche granizado', 'Crema de dulce de leche con chispas de chocolate', b'1'),
(2, 'Menta granizada', 'El segundo mejor sabor de helado después de el de café', b'1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` int(5) DEFAULT NULL,
  `activo` bit(1) NOT NULL DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`, `activo`) VALUES
(1, 'Capuccino', 'El mejor espumoso capuccino del país', 80, b'1'),
(2, 'Cheesecake', 'Un postre fresco y delicioso, perfecto para una tarde de verano', 100, b'1'),
(3, 'Escón de queso', 'Escones de queso caseros', 25, b'1'),
(4, 'Paleta helada', 'Una refrescante paleta para matar el calor', 80, b'1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_comanda`
--

CREATE TABLE `producto_comanda` (
  `idProducto` int(255) NOT NULL,
  `numComanda` int(255) NOT NULL,
  `cantidad` int(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `contrasena` varchar(512) NOT NULL,
  `permComandas` bit(1) NOT NULL DEFAULT b'0',
  `permSLComandas` bit(1) NOT NULL DEFAULT b'0',
  `permMenu` bit(1) NOT NULL DEFAULT b'0',
  `permUsuarios` bit(1) NOT NULL DEFAULT b'0',
  `permEsTableta` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `contrasena`, `permComandas`, `permSLComandas`, `permMenu`, `permUsuarios`, `permEsTableta`) VALUES
(1, 'Lucas', 'passw', b'1', b'0', b'1', b'1', b'0'),
(2, 'Fausto', 'passw', b'0', b'1', b'0', b'0', b'0'),
(3, 'Matias', 'passw', b'0', b'0', b'0', b'0', b'1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comanda`
--
ALTER TABLE `comanda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Comanda_idUsuario` (`idUsuario`);

--
-- Indices de la tabla `comanda-(envase-helado)`
--
ALTER TABLE `comanda-(envase-helado)`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idComanda-id` (`idComanda`),
  ADD KEY `idEnvaseHelado-id` (`idEnvaseHelado`);

--
-- Indices de la tabla `combo`
--
ALTER TABLE `combo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `combo_comanda`
--
ALTER TABLE `combo_comanda`
  ADD PRIMARY KEY (`idCombo`,`numComanda`),
  ADD KEY `FK_ComandaCombo_Comanda` (`numComanda`);

--
-- Indices de la tabla `combo_envase`
--
ALTER TABLE `combo_envase`
  ADD PRIMARY KEY (`idCombo`,`idEnvase`),
  ADD KEY `FK_ComboEnvase_Envase` (`idEnvase`);

--
-- Indices de la tabla `combo_producto`
--
ALTER TABLE `combo_producto`
  ADD PRIMARY KEY (`idCombo`,`idProducto`),
  ADD KEY `FK_ComboProducto_Producto` (`idProducto`);

--
-- Indices de la tabla `envase`
--
ALTER TABLE `envase`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `envase-helado`
--
ALTER TABLE `envase-helado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `envaseid-id` (`envaseId`),
  ADD KEY `heladoid-id` (`heladoId`);

--
-- Indices de la tabla `helado`
--
ALTER TABLE `helado`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto_comanda`
--
ALTER TABLE `producto_comanda`
  ADD PRIMARY KEY (`idProducto`,`numComanda`),
  ADD KEY `FK_ComandaProducto_Comanda` (`numComanda`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comanda`
--
ALTER TABLE `comanda`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `comanda-(envase-helado)`
--
ALTER TABLE `comanda-(envase-helado)`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `combo`
--
ALTER TABLE `combo`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `envase`
--
ALTER TABLE `envase`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `envase-helado`
--
ALTER TABLE `envase-helado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `helado`
--
ALTER TABLE `helado`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comanda`
--
ALTER TABLE `comanda`
  ADD CONSTRAINT `FK_Comanda_idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `comanda-(envase-helado)`
--
ALTER TABLE `comanda-(envase-helado)`
  ADD CONSTRAINT `idComanda-id` FOREIGN KEY (`idComanda`) REFERENCES `comanda` (`id`),
  ADD CONSTRAINT `idEnvaseHelado-id` FOREIGN KEY (`idEnvaseHelado`) REFERENCES `comanda-(envase-helado)` (`id`);

--
-- Filtros para la tabla `combo_comanda`
--
ALTER TABLE `combo_comanda`
  ADD CONSTRAINT `FK_ComandaCombo_Comanda` FOREIGN KEY (`numComanda`) REFERENCES `comanda` (`id`),
  ADD CONSTRAINT `FK_ComandaCombo_Combo` FOREIGN KEY (`idCombo`) REFERENCES `combo` (`id`);

--
-- Filtros para la tabla `combo_envase`
--
ALTER TABLE `combo_envase`
  ADD CONSTRAINT `FK_ComboEnvase_Combo` FOREIGN KEY (`idCombo`) REFERENCES `combo` (`id`),
  ADD CONSTRAINT `FK_ComboEnvase_Envase` FOREIGN KEY (`idEnvase`) REFERENCES `envase` (`id`);

--
-- Filtros para la tabla `combo_producto`
--
ALTER TABLE `combo_producto`
  ADD CONSTRAINT `FK_ComboProducto_Producto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `FK_comboProducto_Combo` FOREIGN KEY (`idCombo`) REFERENCES `combo` (`id`);

--
-- Filtros para la tabla `envase-helado`
--
ALTER TABLE `envase-helado`
  ADD CONSTRAINT `envaseid-id` FOREIGN KEY (`envaseId`) REFERENCES `envase` (`id`),
  ADD CONSTRAINT `heladoid-id` FOREIGN KEY (`heladoId`) REFERENCES `helado` (`id`);

--
-- Filtros para la tabla `producto_comanda`
--
ALTER TABLE `producto_comanda`
  ADD CONSTRAINT `FK_ComandaProducto_Comanda` FOREIGN KEY (`numComanda`) REFERENCES `comanda` (`id`),
  ADD CONSTRAINT `FK_ComandaProducto_Producto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
