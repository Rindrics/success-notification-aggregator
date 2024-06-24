SRC_DIR := src
TEST_DIR := test
PRETTIER := pnpm prettier
ESLINT := pnpm eslint
TEST_CMD := pnpm test

.PHONY: check format test

.PHONY: check
check:
	$(PRETTIER) --check .
	$(ESLINT) .

.PHONY: format
format: $(SRC_DIR) $(TEST_DIR)
	$(PRETTIER) --write .

.PHONY: test
test: format
	$(TEST_CMD)
