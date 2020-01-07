package ee.mrtnh.encrypter_ui.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class EncrypterUiController {

    private static final Logger logger = LoggerFactory.getLogger(EncrypterUiController.class);

    private static final String HOME_VIEW = "encrypterUi";


    @GetMapping(value = "/")
    public String showHome() {
        logger.info("Loading home page");
        return HOME_VIEW;
    }
}
