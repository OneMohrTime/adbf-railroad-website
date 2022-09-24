// *****************************************************************************
// =============================================================================
// Globals: breakEmailVsContainer
// =============================================================================
// *****************************************************************************

export function breakEmailVsContainer(
  argGlobalFooterEmail,
  argGlobalFooterEmailContainer
) {
  const globalFooterEmail = document.querySelector(argGlobalFooterEmail);
  const globalFooterEmailContainer = document.querySelector(argGlobalFooterEmailContainer);

  if (
    typeof globalFooterEmail !== "undefined" &&
    typeof globalFooterEmailContainer !== "undefined"
  ) {
    const globalFooterEmailInner = globalFooterEmail.innerHTML;
    const globalFooterEmailPartName = globalFooterEmailInner.substring(
      0,
      globalFooterEmailInner.lastIndexOf("@") + 1
    );
    const globalFooterEmailPartDomain = globalFooterEmailInner.substring(
      globalFooterEmailInner.lastIndexOf("@") + 1
    );
    const globalFooterEmailPartWrappedName = `<span class="u-block">${globalFooterEmailPartName}</span>`;
    const globalFooterEmailPartWrappedDomain = `<span class="u-block">${globalFooterEmailPartDomain}</span>`;
    const globalFooterEmailPartWrappedEmail =
      globalFooterEmailPartWrappedName + globalFooterEmailPartWrappedDomain;
    const globalFooterEmailWidth = globalFooterEmail.offsetWidth;
    let globalFooterEmailContainerWidth = globalFooterEmailContainer.offsetWidth;
    let previousStateOfFooterEmailString = null;

    function checkFooterStringLengthVsContainerAndBreakOrJoin() {
      // console.log("check");
      let currentStateOfFooterEmailString = null;
      globalFooterEmailContainerWidth = globalFooterEmailContainer.offsetWidth;
      // console.log(globalFooterEmailContainerWidth);
      if (globalFooterEmailWidth > globalFooterEmailContainerWidth - 8) {
        currentStateOfFooterEmailString = "break";
        // console.log(currentStateOfFooterEmailString);
        if (currentStateOfFooterEmailString != previousStateOfFooterEmailString) {
          // console.log(currentStateOfFooterEmailString);
          globalFooterEmail.innerHTML = globalFooterEmailPartWrappedEmail;
        }
      } else {
        currentStateOfFooterEmailString = "join";
        // console.log(currentStateOfFooterEmailString);
        if (currentStateOfFooterEmailString != previousStateOfFooterEmailString) {
          // console.log(currentStateOfFooterEmailString);
          globalFooterEmail.innerHTML = globalFooterEmailInner;
        }
      }
      previousStateOfFooterEmailString = currentStateOfFooterEmailString;
    }

    checkFooterStringLengthVsContainerAndBreakOrJoin();
    window.addEventListener("resize", function() {
      checkFooterStringLengthVsContainerAndBreakOrJoin();
    });
  } else {
    console.log("#global-footer-email or #global-footer-email-container is not defined");
  }
}
