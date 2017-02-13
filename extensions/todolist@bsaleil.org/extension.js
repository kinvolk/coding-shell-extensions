// Authors:
// * Baptiste Saleil http://bsaleil.org/
// * Community: https://github.com/bsaleil/todolist-gnome-shell-extension/network
// With code from: https://github.com/vibou/vibou.gTile
//
// Licence: GPLv2+

const St = imports.gi.St;
const Gtk = imports.gi.Gtk;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Main = imports.ui.main;
const Lang = imports.lang;
const Clutter = imports.gi.Clutter;
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Shell = imports.gi.Shell;
const Meta = imports.gi.Meta;

const Gettext = imports.gettext;
const _ = Gettext.domain('todolist').gettext;

const Utils = imports.misc.extensionUtils.getCurrentExtension().imports.utils;
const ExtensionSettings = Utils.getSettings(); // Get settings from utils.js

const MAX_LENGTH = 100;
const KEY_RETURN = 65293;
const KEY_ENTER  = 65421;
const BASE_TASKS = "Do something\nDo something else\n1CF86\nDo that again\n";

const Clipboard = St.Clipboard.get_default();
const CLIPBOARD_TYPE = St.ClipboardType.CLIPBOARD;
const todo_list = Extension.imports.todolist_display;

let todolist;	// Todolist instance
let meta;

//----------------------------------------------------------------------

// Init function
function init(metadata)
{
	meta = metadata;
}

function enable()
{
	todolist = new todo_list.TodoList(meta); 
	todolist._enable();
	Main.panel.addToStatusArea('todolist', todolist);
}

function disable()
{
	todolist._disable();
	todolist.destroy();
	todolist = null;
}

//----------------------------------------------------------------------
