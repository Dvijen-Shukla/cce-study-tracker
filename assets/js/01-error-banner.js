/* Runtime error fallback: if something breaks before/while rendering, show a readable message instead of a blank page. */
addEventListener("error",e=>{
  const a=document.getElementById("app");
  if(a&&(!a.innerHTML.trim()||a.querySelector(".splash")))
    a.innerHTML='<div class="cd" style="margin-top:20px;border-color:#fb7185"><b style="color:#fb7185">કંઈક ખોટું થયું</b><p class="mu sm" style="margin:8px 0 14px">Page ફરી load કરો. સમસ્યા રહે તો નીચેનો message મોકલો:<br><code>'+String(e.message||"").replace(/[<>&]/g,"")+'</code></p><button class="btn p" onclick="location.reload()">↻ Reload</button></div>';
});
