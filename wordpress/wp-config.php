<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'proviemplea_db' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost:3307' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '4q~U|Vf+]3:0`HVblCRs3C|rR`Q0NE=TJ#wce]&h&VDUON</eyXVd(ZSN1IyBR>J' );
define( 'SECURE_AUTH_KEY',  'HZd>1x$ApC:HjYFcgaBP(jF2w,xZcdes79H@R5um(/=}Mx/BU8iqhiK>SZLk+eR8' );
define( 'LOGGED_IN_KEY',    '>r? hX1c]E&c>WN.h ETN#A#dj!1k.nE//tJbs+{b1z?4I%ZZ?9.Opo3@<$CCNf<' );
define( 'NONCE_KEY',        'gx?EFiFwKxxEABv&_E0Tk;}R{1RQ lw,!>a=5@]~rr7b0h}6X[)Qy&BHi>!|e9[Z' );
define( 'AUTH_SALT',        '^XfBMfW*Xtk>2yQ{Jb{;S?>yX3D7+$.ZtEl[_j=dGz@t,w[<?}jpplKwO?Z~(CYo' );
define( 'SECURE_AUTH_SALT', 'NNy^*3if7Q+1!5rZODmRs&uC;EzoY{(bfszfyOUUb4+L}>OdhhuM3K921@_?lxB,' );
define( 'LOGGED_IN_SALT',   '*L,~%xgJ.m1W(7Wf;bO8^Zji6Ji^FLb4~@ph?)t)}rc`W;}dx@>q3qu{%!R((]X.' );
define( 'NONCE_SALT',       '1e3t|/;)P}/]4ogjEf2xI#+/HYp5V<^0mzq9b?vbk3NuY% &nqptm../`n#E,9 }' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'pe_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
