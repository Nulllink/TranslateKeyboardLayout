import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class TKL extends Plugin {
	EN = "`qwertyuiop[]asdfghjkl;'zxcvbnm,./~QWERTYUIOP{}ASDFGHJKL:ZXCVBNM<>?!#$%^&";
	RU = "ёйцукенгшщзхъфывапролджэячсмитьбю.ЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЯЧСМИТЬБЮ,!#;%:?";
	ruchars = "ёйцукенгшщзхъфывапролджэячсмитьбю";
	
	async onload() {
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'translate',
			name: 'translate',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				let str:string = editor.getSelection();
				str = str.toLowerCase();
				let rubool:boolean = false;
				let newstr:string = "";
				for (var i = 0; i < str.length; i++) {
					let ch = str.charAt(i);
					let ind = this.ruchars.indexOf(ch);
					if (ind >= 0){
						rubool = true
						break;
					}
				}
				if(rubool){
					for (var i = 0; i < str.length; i++) {
						let ch = str.charAt(i);
						let ind = this.RU.indexOf(ch);
						if(ind >= 0){
							newstr = newstr + this.EN.charAt(ind);
						}
						else{
							newstr = newstr + ch;
						}
					}
				}
				else{
					for (var i = 0; i < str.length; i++) {
						let ch = str.charAt(i);
						let ind = this.EN.indexOf(ch);
						if(ind >= 0){
							newstr = newstr + this.RU.charAt(ind);
						}
						else{
							newstr = newstr + ch;
						}
					}
				}
				editor.replaceSelection(`${newstr}`);
			}
		});
	}
}