/**
 * Theme JS
 *
 * @copyright 2019 NB Communication Ltd
 *
 */

var theme = {
	init: function() {
		this.protectLinks();
		this.touchHelper();
		const toggleBtn = $(".js-toggle-nav");
		const nav = $(".uk-navbar-nav");
		const classActive = "uk-navbar-toggle--active";
		const dropdownBtn = $(".js-toggle-dropdown");
		const dropdownActive = "dropdown--active";
		const dropdownContainer = $(".uk-navbar-dropdown");
		const equalItem = $(".js-height-match");
		const listingLink = $(".js-toggle-text");
		const listingText = $(".listing-item__text");
		const listingItemActive = "listing-item-bottom--active";
		const listingItem = $(".listing-item-bottom");
		if (toggleBtn.length) {
			this.toggleNav(toggleBtn, classActive, nav);
		}
		if (dropdownBtn.length) {
			this.toggleDropdown(dropdownBtn, dropdownActive);
		}
		if (dropdownContainer.length) {
			this.toggleDopdownOut(
				dropdownContainer,
				dropdownBtn,
				dropdownActive
			);
		}
		if (dropdownContainer.length) {
			this.equalHeight(equalItem);
		}
		if (listingLink.length) {
			this.toggleText(
				listingLink,
				listingText,
				listingItem,
				listingItemActive
			);
		}
	},

	equalHeight: function(equalItem) {
		let itemHeight = 0;
		equalItem.each(function() {
			if ($(this).outerHeight() > itemHeight) {
				itemHeight = $(this).outerHeight();
			}
		});
		equalItem.css("height", itemHeight);
	},

	protectLinks: function() {
		var $links = $("a[target='_blank']");
		if (!$links.length) return;

		// Make sure external links have the appropriate rel attributes
		$links.each(function() {
			var $a = $(this),
				rel = $a.attr("rel"),
				protect = ["noopener", "noreferrer"];

			rel = !$nb.x(rel) ? rel.split(" ") : [];
			for (var i = 0; i < protect.length; i++) {
				if (rel.indexOf(protect[i]) < 0) rel.push(protect[i]);
			}

			$a.attr("rel", rel.join(" "));
		});
	},

	touchHelper: function() {
		if (
			(("ontouchstart" in window || navigator.msMaxTouchPoints > 0) &&
				window.matchMedia("screen and (max-width: 1200px)").matches) ||
			("ontouchstart" in window &&
				navigator.appVersion.indexOf("Mac") !== -1)
		) {
			$("html").addClass("touch");
		} else {
			$("html").addClass("no-touch");
		}
	},

	toggleNav: function(obj, classActive, nav) {
		obj.click(function() {
			obj.toggleClass(classActive);
			nav.slideToggle();
		});
	},

	toggleDropdown: function(obj, classActive) {
		obj.click(function() {
			obj.parent().toggleClass(classActive);
		});
	},

	toggleDopdownOut: function(obj, dropdownBtn, classActive) {
		$(document).mouseup(function(e) {
			if (!obj.is(e.target) && obj.has(e.target).length === 0) {
				dropdownBtn.parent().removeClass(classActive);
				obj.hide();
			}
		});
	},

	toggleText: function(obj, listingText, listingItem, listingItemActive) {
		if (!$("html").hasClass("touch")) {
			obj.hover(function() {
				$(this)
					.find(listingText)
					.slideToggle();
				$(this)
					.find(listingItem)
					.toggleClass(listingItemActive);
			});
		} else {
			obj.click(function() {
				$(this)
					.find(listingText)
					.slideToggle();
				$(this)
					.find(listingItem)
					.toggleClass(listingItemActive);
			});
		}
	}
};

$(document).ready(function() {
	theme.init();
});
