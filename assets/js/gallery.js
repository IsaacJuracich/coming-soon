function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(m, key, value) {
      vars[key] = value;
    });
  return vars;
}
var items = []
var itemsfull = []
var index = 0;
var type = getUrlVars()["type"];
if (!type) type = "capes"
$.get("/getItems/" + type, async function(data) {
  $("#itemsrow").empty()
  console.log(data)
  var datasorted = data.sort((a, b) => {
    if (a.featuredOnStore) return -1;
    return 0;
  })
  items = divideinto20(datasorted)
  itemsfull = datasorted
  items[index].forEach((item, i) => {
    if (type == "tags") {
      $("#itemsrow").append(getNametagItem(item))
    } else if (type == "headbands") {
      $("#itemsrow").append(getBandanaItem(item))
    } else if (type == "wings") {
      $("#itemsrow").append(getWingsItem(item))
    } else {
      $("#itemsrow").append(getItemTextured(item))
    }
  });
  $(".itembutton").click(function() {
    prepareModal($(this).attr("cosid"))
    $("#itemmodal").modal("show")
  })

});
$(window).scroll(function() {
  if ($(document).height() - $(this).height() == $(this).scrollTop()) {
    index++;
    items[index].forEach((item, i) => {
      if (type == "tags") {
        $("#itemsrow").append(getNametagItem(item))
      } else if (type == "headbands") {
        $("#itemsrow").append(getBandanaItem(item))
      } else if (type == "wings") {
        $("#itemsrow").append(getWingsItem(item))
      } else {
        $("#itemsrow").append(getItemTextured(item))
      }
    });
    $(".itembutton").click(function() {
      prepareModal($(this).attr("cosid"))
      $("#itemmodal").modal("show")
    })

  }
});

function divideinto20(arr2) {
  var i, j, temporary, chunk = 20;
  var returned = []
  for (i = 0, j = arr2.length; i < j; i += chunk) {
    temporary = arr2.slice(i, i + chunk);
    returned.push(temporary)
  }
  return returned;
}
$("#cloaksbutton").click(() => location.href = "/store.html?type=cloaks")
$("#tagsbutton").click(() => location.href = "/store.html?type=tags")
$("#wingsbutton").click(() => location.href = "/store.html?type=wings")
$("#headbandsbutton").click(() => location.href = "/store.html?type=headbands")

function getItemTextured(data) {

  return `
  <style>#cape${data.cosmeticName} * {background-image: url("${data.texture}");}</style>

  <div class="col-sm-12 col-md-4 col-lg-3" style="margin-bottom: 25px">
    <div class="item">
        <div class="d-flex d-sm-flex d-xl-flex justify-content-center align-items-center justify-content-sm-center justify-content-xl-center it">

        <div id="cape${data.cosmeticName}" class="mc-cape-viewer-9x">
	<div class="wrapper">
		<div class="cape">
			<div class="left"></div>
			<div class="front"></div>
			<div class="right"></div>
			<div class="back"></div>
		</div>
	</div>
</div>

        </div>
        <h6 class="text-center itemname">${data.cosmeticName}</h6>
        <h6 class="text-center itemname"><span style=" text-decoration: line-through;color:red">$5.99</span> $4.79</h6><button cosid="${data.cosmeticID}" class="btn btn-primary orbitbutton itembutton" type="button">View</button>
        ` + (data.featuredOnStore ? `<h6 class="text-center" style="color: var(--bs-warning);"><i class="fa fa-star"></i>  Featured </h6>` : ``) + `
    </div>
</div>
  `
}


function getBandanaItem(data) {

  return `
  <div class="col-sm-12 col-md-4 col-lg-3" style="margin-bottom: 25px">
    <div class="item">
      <div class="d-flex d-sm-flex d-xl-flex justify-content-center align-items-center justify-content-sm-center justify-content-xl-center it">
        <div class="text-center" style="position: static; width: 100%;height: 77.1px;">
        <div id="headband${data.cosmeticName}" class="mc-bandanaviewer-9x-container">
          <img  class="mc-bandanaviewer-9x" src="${data.texture}" />
        </div>
        </div>
      </div>
      <h6 class="text-center itemname">${data.cosmeticName}</h6>
      <h6 class="text-center itemname"><span style=" text-decoration: line-through;color:red">$5.99</span> $4.79</h6><button cosid="${data.cosmeticID}" class="btn btn-primary orbitbutton itembutton" type="button">View</button>
      ` + (data.featuredOnStore ? `<h6 class="text-center" style="color: var(--bs-warning);"><i class="fa fa-star"></i>  Featured </h6>` : ``) + `
    </div>
  </div>

  `
}


function getWingsItem(data) {

  return `
  <div class="col-sm-12 col-md-4 col-lg-3" style="margin-bottom: 25px">
    <div class="item">
      <div class="d-flex d-sm-flex d-xl-flex justify-content-center align-items-center justify-content-sm-center justify-content-xl-center it">
        <div class="text-center" style="position: static; width: 100%;height: 140.1px;">
        <div id="wings{data.cosmeticName}" class="mc-wingsviewer-9x-container">
          <img  class="mc-wingsviewer-9x" src="${data.texture}" />
        </div>
        </div>
      </div>
      <h6 class="text-center itemname">${data.cosmeticName}</h6>
      <h6 class="text-center itemname"><span style=" text-decoration: line-through;color:red">$5.99</span> $4.79</h6><button cosid="${data.cosmeticID}" class="btn btn-primary orbitbutton itembutton" type="button">View</button>
      ` + (data.featuredOnStore ? `<h6 class="text-center" style="color: var(--bs-warning);"><i class="fa fa-star"></i>  Featured </h6>` : ``) + `

    </div>
  </div>

  `
}


$("#ignerror").hide()
var itemobj = null

function prepareModal(id) {
  console.log(id)
  itemobj = itemsfull.find((item) => item.cosmeticID === id)
  $("#itemmodalname").text(itemobj.cosmeticName + " " + type.replace("s", ""))
  $("#itemmodalname2").text(itemobj.cosmeticName + " " + type.replace("s", ""))
  $("#itemmodalviewdiv").empty()
  if (type == "tags") {
    $("#itemmodalviewdiv").append("<h1 class='text-center'>" + new XMLSerializer().serializeToString(itemobj.text.replaceColorCodes()) + "</h1>")

  } else if (type == "headbands") {
    $("#itemmodalviewdiv").append(getBandanaTexture(itemobj))
  } else if (type == "wings") {
    $("#itemmodalviewdiv").append(getWingsTexture(itemobj))
  } else {
    $("#itemmodalviewdiv").append(getTexture(itemobj))
  }
}

$("#itemmodalpurchasebutton").click(function() {
  var ref = $("#itemmodaligninput").val()
  var ign = $("#itemmodaligninput2").val()
  if (ign == "" | !ign) {
    $("#ignerror").show()
    return;
  }
  $.post("/createPurchase", {
    cosmeticID: itemobj.cosmeticID,
    ign: ign,
    cosmeticType: type.replace("s", ""),
    cosmeticName: itemobj.cosmeticName,
    referral: ref
  }, async function(data) {
    location.href = data
  });


})

function getBandanaTexture(obj) {
  return `
  <div class="text-center" style="position: static; width: 100%;height: 77.1px;">
  <div id="headband${obj.cosmeticName}" class="mc-bandanaviewer-9x-container" style="margin-left:-77px">
    <img  class="mc-bandanaviewer-9x" src="${obj.texture}" />
  </div>
  </div>

  `
}

function getWingsTexture(data) {
  return `
  <div class="text-center" style="position: static; width: 100%;height: 140.1px;">
  <div id="wings{data.cosmeticName}" class="mc-wingsviewer-9x-container">
    <img  class="mc-wingsviewer-9x" src="${data.texture}" />
  </div>
  </div>
`
}

function getTexture(obj) {
  return `

  <style>
	#cape_viewer *{
		background-image: url('${obj.texture}');
	}
</style>

<!-- Cape Viewer -->
<div id="cape_viewer" class="mc-cape-viewer-9x wave">
	<div class="wrapper">
		<div class="cape">
			<div class="left"></div>
			<div class="front"></div>
			<div class="right"></div>
			<div class="back"></div>
		</div>
	</div>
</div>
  `
}

function getNametagItem(data) {
  return `
  <div class="col-sm-12 col-md-4 col-lg-3" style="margin-bottom: 25px">
    <div class="item">
        <div class="d-flex d-sm-flex d-xl-flex justify-content-center align-items-center justify-content-sm-center justify-content-xl-center it">
        <h4 class="text-center" style="color: white;  text-overflow: ellipsis;width:100%;  white-space: nowrap;overflow: hidden;">${new XMLSerializer().serializeToString(data.text.replaceColorCodes())}</h4>
        </div>
        <h6 class="text-center itemname">${data.cosmeticName}</h6>
        <h6 class="text-center itemname"><span style=" text-decoration: line-through;color:red">$5.99</span> $4.79</h6><button cosid="${data.cosmeticID}" class="btn btn-primary orbitbutton itembutton" type="button">View</button>
        ` + (data.featuredOnStore ? `<h6 class="text-center" style="color: var(--bs-warning);"><i class="fa fa-star"></i>  Featured </h6>` : ``) + `

    </div>
  </div>

  `
}

$("#custom-tag").click(() => {
  $("#custom-tag-modal").modal("show")
})


$("#custom-tag-purchase-button").click(function() {

  var ign = $("#custom-tag-ign").val()
  if (ign === "" || !ign) {
    $("#custom-tag-error").show()
    $("#custom-tag-error span").text("Ign must not be blank")
    return;
  }
  var name = $("#custom-tag-name").val()
  if (name === "" || !name) {
    $("#custom-tag-error").show()
    $("#custom-tag-error span").text("Name must not be blank")
    return;
  }
  var content = $("#custom-tag-content").val()
  if (content === "" | !content) {
    $("#custom-tag-error").show()
    $("#custom-tag-error span").text("Content must not be blank")
    return;
  }
  $.post("/createPurchase/CustomTag", {
    content: content,
    ign: ign,
    name: name
  }, async function(data) {
    console.log(data)
    if (data.success) {
      location.href = data.link
    } else {
      $("#custom-tag-error").show()
      $("#custom-tag-error span").text(data.text)
    }
  });


})
