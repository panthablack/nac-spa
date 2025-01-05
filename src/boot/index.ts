import axios from 'axios'
import Cookies from 'js-cookie'

// Config // ***************************************************************************************
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
// *************************************************************************************************

// If xdebug disabled, make sure cookie is deleted
if (import.meta.env.VITE_X_DEBUG !== true) Cookies.remove('XDEBUG_SESSION')
