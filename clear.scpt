#!/usr/bin/osascript
on run argv
	tell application "Google Chrome"
		tell front window
			set origTab to active tab
			set origTabIndex to active tab index
			
			-- clear host cache
			set newTab to make new tab with properties {URL:"chrome://net-internals/#dns"}
			execute newTab javascript "document.getElementById('dns-view-clear-cache').click()"
			set clickHostDone to not loading of newTab
			repeat until clickHostDone
				set clickHostDone to not loading of newTab
			end repeat
			
			delay 0.3
			
			-- done. now clear sockets
			set URL of newTab to "chrome://net-internals/#sockets"
			execute newTab javascript "document.getElementById('sockets-view-flush-button').click()"
			set clickSocketsDone to not loading of newTab
			repeat until clickSocketsDone
				set clickSocketsDone to not loading of newTab
			end repeat
			
			delay 0.3
			
			-- done. now clear htsts
			set URL of newTab to "chrome://net-internals/#hsts"
			
			-- dynamic_insert_js_script_start
			
            execute newTab javascript "['pre2-alimama.inc.com','pre3-alimama.inc.com'].forEach((v,i)=>{
                const el = document.getElementById('domain-security-policy-view-delete-input')
                el.addEventListener('clcik,'(e)=>{console.log(e);})
                setTimeout(()=>{ 
                    el.value= v;
                    el.click()
                },300*i)
            })"
            
			-- dynamic_insert_js_script_end
			
			-- dynamic_insert_js_delay_start
			delay 0.6
			-- dynamic_insert_js_delay_end
			
			set clickHTSTSDone to not loading of newTab
			repeat until clickHTSTSDone
				set clickHTSTSDone to not loading of the tab
			end repeat
			
			-- done. now Restore the original page
			close newTab
			
			set active tab index to origTabIndex
			
			
		end tell
	end tell
end run